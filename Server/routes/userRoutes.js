const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const {
  getOrCreateUser,
  getUserStatus,
} = require("../controllers/userController");

router.get("/me", verifyToken, getOrCreateUser);
router.get("/status", verifyToken, getUserStatus);

module.exports = router;
