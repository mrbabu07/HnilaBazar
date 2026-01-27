const getOrCreateUser = async (req, res) => {
  try {
    console.log("📝 Getting user for Firebase UID:", req.user.uid);

    const User = req.app.locals.models.User;
    let user = await User.findByFirebaseUid(req.user.uid);

    console.log("📝 Found user:", user);

    if (!user) {
      console.log("📝 Creating new user...");
      const newUser = await User.create({
        firebaseUid: req.user.uid,
        firstName: req.user.name?.split(" ")[0] || "",
        lastName: req.user.name?.split(" ").slice(1).join(" ") || "",
        email: req.user.email,
        role: "customer", // Default role should be customer
      });

      user = newUser;
      console.log("📝 Created user:", user);
    }

    res.json({ success: true, data: user });
  } catch (error) {
    console.error("❌ Error in getOrCreateUser:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const getUserStatus = async (req, res) => {
  try {
    const User = req.app.locals.models.User;
    const user = await User.findByFirebaseUid(req.user.uid);

    res.json({
      success: true,
      data: {
        firebaseUid: req.user.uid,
        email: req.user.email,
        name: req.user.name,
        dbUser: user,
        isAdmin: user?.role === "admin",
        hasUser: !!user,
      },
    });
  } catch (error) {
    console.error("❌ Error in getUserStatus:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getOrCreateUser, getUserStatus };
