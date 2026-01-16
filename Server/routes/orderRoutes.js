const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require("../middleware/auth");
const {
  getAllOrders,
  getUserOrders,
  createOrder,
  updateOrderStatus,
} = require("../controllers/orderController");

router.get("/", verifyToken, verifyAdmin, getAllOrders);
router.get("/my-orders", verifyToken, getUserOrders);
router.post("/", verifyToken, createOrder);
router.patch("/:id/status", verifyToken, verifyAdmin, updateOrderStatus);

module.exports = router;
