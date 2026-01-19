const createReview = async (req, res) => {
  try {
    const Review = req.app.locals.models.Review;
    const User = req.app.locals.models.User;
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

    // Create notification for admin
    try {
      const admins = await User.findByRole("admin");
      for (const admin of admins) {
        await User.addNotification(admin._id.toString(), {
          type: "review",
          title: "New Product Review",
          message: `${userName} left a ${rating}-star review`,
          link: `/admin/reviews`,
          metadata: {
            reviewId: reviewId.toString(),
            productId,
            rating,
          },
        });
      }
    } catch (notifError) {
      console.error("Error creating admin notification:", notifError);
      // Don't fail the review creation if notification fails
    }

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

// Admin functions
const getAllReviews = async (req, res) => {
  try {
    const Review = req.app.locals.models.Review;
    const { page = 1, limit = 50 } = req.query;

    const skip = (page - 1) * limit;
    const reviews = await Review.getAllReviews(parseInt(limit), skip);

    res.json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.error("Error fetching all reviews:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const getUnrepliedReviews = async (req, res) => {
  try {
    const Review = req.app.locals.models.Review;
    const reviews = await Review.getUnrepliedReviews();

    res.json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.error("Error fetching unreplied reviews:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const addAdminReply = async (req, res) => {
  try {
    const Review = req.app.locals.models.Review;
    const User = req.app.locals.models.User;
    const { reviewId } = req.params;
    const { reply } = req.body;
    const adminId = req.user.uid;
    const adminName = req.user.name || req.user.email;

    if (!reply || reply.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "Reply text is required",
      });
    }

    // Get the review to find the user who wrote it
    const review = await Review.getReviewById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        error: "Review not found",
      });
    }

    const result = await Review.addAdminReply(
      reviewId,
      reply.trim(),
      adminId,
      adminName,
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        error: "Review not found",
      });
    }

    // Notify the user who wrote the review
    try {
      await User.addNotification(review.userId, {
        type: "review_reply",
        title: "Admin Replied to Your Review",
        message: `An admin has responded to your review`,
        link: `/product/${review.productId}`,
        metadata: {
          reviewId: reviewId,
          productId: review.productId.toString(),
        },
      });
    } catch (notifError) {
      console.error("Error creating user notification:", notifError);
      // Don't fail the reply if notification fails
    }

    res.json({
      success: true,
      message: "Reply added successfully",
    });
  } catch (error) {
    console.error("Error adding admin reply:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteReviewAdmin = async (req, res) => {
  try {
    const Review = req.app.locals.models.Review;
    const { reviewId } = req.params;

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

module.exports = {
  createReview,
  getProductReviews,
  getUserReviews,
  updateReview,
  deleteReview,
  markReviewHelpful,
  getAllReviews,
  getUnrepliedReviews,
  addAdminReply,
  deleteReviewAdmin,
};
