const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const { getOrCreateUser } = require("../controllers/userController");

router.get("/me", verifyToken, getOrCreateUser);

module.exports = router;
