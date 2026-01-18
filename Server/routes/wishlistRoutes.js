const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  clearWishlist,
} = require("../controllers/wishlistController");

// All wishlist routes require authentication
router.use(verifyToken);

// GET /api/wishlist - Get user's wishlist
router.get("/", getWishlist);

// POST /api/wishlist - Add product to wishlist
router.post("/", addToWishlist);

// DELETE /api/wishlist/:productId - Remove product from wishlist
router.delete("/:productId", removeFromWishlist);

// DELETE /api/wishlist - Clear entire wishlist
router.delete("/", clearWishlist);

module.exports = router;
