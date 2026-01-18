const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const {
  createReview,
  getProductReviews,
  getUserReviews,
  updateReview,
  deleteReview,
  markReviewHelpful,
} = require("../controllers/reviewController");

// GET /api/reviews/product/:productId - Get reviews for a product (public)
router.get("/product/:productId", getProductReviews);

// POST /api/reviews/:reviewId/helpful - Mark review as helpful (public)
router.post("/:reviewId/helpful", markReviewHelpful);

// All routes below require authentication
router.use(verifyToken);

// POST /api/reviews - Create a new review
router.post("/", createReview);

// GET /api/reviews/my-reviews - Get user's reviews
router.get("/my-reviews", getUserReviews);

// PUT /api/reviews/:reviewId - Update a review
router.put("/:reviewId", updateReview);

// DELETE /api/reviews/:reviewId - Delete a review
router.delete("/:reviewId", deleteReview);

module.exports = router;
