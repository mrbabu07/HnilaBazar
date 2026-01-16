const getOrCreateUser = async (req, res) => {
  try {
    const User = req.app.locals.models.User;
    let user = await User.findByFirebaseUid(req.user.uid);

    if (!user) {
      const userId = await User.create({
        firebaseUid: req.user.uid,
        name: req.user.name || req.user.email,
        email: req.user.email,
        role: "user",
      });

      user = await User.findById(userId);
    }

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getOrCreateUser };
