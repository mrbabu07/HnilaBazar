const getOrCreateUser = async (req, res) => {
  try {
    console.log("📝 Getting user for Firebase UID:", req.user.uid);

    const User = req.app.locals.models.User;
    let user = await User.findByFirebaseUid(req.user.uid);

    console.log("📝 Found user:", user);

    if (!user) {
      console.log("📝 Creating new user...");
      const userId = await User.create({
        firebaseUid: req.user.uid,
        name: req.user.name || req.user.email,
        email: req.user.email,
        role: "user",
      });

      user = await User.findById(userId);
      console.log("📝 Created user:", user);
    }

    res.json({ success: true, data: user });
  } catch (error) {
    console.error("❌ Error in getOrCreateUser:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getOrCreateUser };
