const createReview = async (req, res) => {
  try {
    const Review = req.app.locals.models.Review;
    const { productId, rating, comment, title } = req.body;
    const userId = req.user.uid;
    const userName = req.user.name || req.user.email;

    if (!productId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        error: "Product ID, rating, and comment are required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        error: "Rating must be between 1 and 5",
      });
    }

    // Check if user has already reviewed this product
    const existingReviews = await Review.findByUserId(userId);
    const hasReviewed = existingReviews.some(
      (review) => review.productId.toString() === productId,
    );

    if (hasReviewed) {
      return res.status(400).json({
        success: false,
        error: "You have already reviewed this product",
      });
    }

    // Check if user has purchased this product (for verified badge)
    const verified = await Review.verifyPurchase(userId, productId);

    const reviewId = await Review.create({
      productId,
      userId,
      userName,
      rating,
      comment,
      title: title || "",
      verified,
    });

    res.status(201).json({
      success: true,
      data: { id: reviewId, verified },
      message: "Review created successfully",
    });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const getProductReviews = async (req, res) => {
  try {
    const Review = req.app.locals.models.Review;
    const { productId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;
    const reviews = await Review.findByProductId(
      productId,
      parseInt(limit),
      skip,
    );
    const stats = await Review.getProductRatingStats(productId);

    res.json({
      success: true,
      data: {
        reviews,
        stats,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          hasMore: reviews.length === parseInt(limit),
        },
      },
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const getUserReviews = async (req, res) => {
  try {
    const Review = req.app.locals.models.Review;
    const userId = req.user.uid;

    const reviews = await Review.findByUserId(userId);

    res.json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const Review = req.app.locals.models.Review;
    const { reviewId } = req.params;
    const { rating, comment, title } = req.body;
    const userId = req.user.uid;

    // Verify review belongs to user
    const reviews = await Review.findByUserId(userId);
    const userReview = reviews.find(
      (review) => review._id.toString() === reviewId,
    );

    if (!userReview) {
      return res.status(403).json({
        success: false,
        error: "You can only update your own reviews",
      });
    }

    const updateData = {};
    if (rating) updateData.rating = parseInt(rating);
    if (comment) updateData.comment = comment;
    if (title !== undefined) updateData.title = title;

    const result = await Review.update(reviewId, updateData);

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        error: "Review not found",
      });
    }

    res.json({
      success: true,
      message: "Review updated successfully",
    });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const Review = req.app.locals.models.Review;
    const { reviewId } = req.params;
    const userId = req.user.uid;

    // Verify review belongs to user
    const reviews = await Review.findByUserId(userId);
    const userReview = reviews.find(
      (review) => review._id.toString() === reviewId,
    );

    if (!userReview) {
      return res.status(403).json({
        success: false,
        error: "You can only delete your own reviews",
      });
    }

    const result = await Review.delete(reviewId);

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        error: "Review not found",
      });
    }

    res.json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const markReviewHelpful = async (req, res) => {
  try {
    const Review = req.app.locals.models.Review;
    const { reviewId } = req.params;

    const result = await Review.markHelpful(reviewId);

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        error: "Review not found",
      });
    }

    res.json({
      success: true,
      message: "Review marked as helpful",
    });
  } catch (error) {
    console.error("Error marking review helpful:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createReview,
  getProductReviews,
  getUserReviews,
  updateReview,
  deleteReview,
  markReviewHelpful,
};
