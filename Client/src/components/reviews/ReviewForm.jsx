import { useState } from "react";
import { useTranslation } from "react-i18next";
import StarRating from "./StarRating";
import useAuth from "../../hooks/useAuth";

const ReviewForm = ({ productId, onReviewSubmitted, onCancel }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    rating: 0,
    title: "",
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleRatingChange = (rating) => {
    setFormData((prev) => ({ ...prev, rating }));
    if (errors.rating) {
      setErrors((prev) => ({ ...prev, rating: null }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.rating === 0) {
      newErrors.rating = "Please select a rating";
    }

    if (!formData.comment.trim()) {
      newErrors.comment = "Please write a review";
    } else if (formData.comment.trim().length < 10) {
      newErrors.comment = "Review must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({
          productId,
          rating: formData.rating,
          title: formData.title.trim(),
          comment: formData.comment.trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Reset form
        setFormData({ rating: 0, title: "", comment: "" });
        setErrors({});

        // Notify parent component
        if (onReviewSubmitted) {
          onReviewSubmitted(data.data);
        }
      } else {
        setErrors({ submit: data.error || "Failed to submit review" });
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setErrors({ submit: "Failed to submit review. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Please sign in to write a review
        </p>
        <button
          onClick={() => (window.location.href = "/login")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Write a Review
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Rating *
          </label>
          <StarRating
            rating={formData.rating}
            onRatingChange={handleRatingChange}
            size="lg"
          />
          {errors.rating && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.rating}
            </p>
          )}
        </div>

        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Review Title (Optional)
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Summarize your review in a few words"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            maxLength={100}
          />
        </div>

        {/* Comment */}
        <div>
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Your Review *
          </label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            placeholder="Share your experience with this product..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
            rows={4}
            maxLength={1000}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.comment ? (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.comment}
              </p>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Minimum 10 characters
              </p>
            )}
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formData.comment.length}/1000
            </p>
          </div>
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.submit}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
