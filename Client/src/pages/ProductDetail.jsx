import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getProductById } from "../services/api";
import { getProductReviews } from "../services/reviewApi";
import useCart from "../hooks/useCart";
import Loading from "../components/Loading";
import AutoSlideshow from "../components/AutoSlideshow";
import StarRating from "../components/StarRating";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(null);

  // Review states
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [id]);

  useEffect(() => {
    // If we get a 404 error, start countdown and redirect to home
    if (error && error.includes("not found")) {
      setRedirectCountdown(8);
      const timer = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate("/");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [error, navigate]);

  const fetchProduct = async () => {
    try {
      // Validate product ID format
      if (!id || id.length !== 24) {
        console.error("Invalid product ID format:", id);
        setError("Invalid product ID");
        setLoading(false);
        return;
      }

      const response = await getProductById(id);
      const data = response.data.data;
      setProduct(data);

      // Set initial selected image
      const initialImage = data.image || (data.images && data.images[0]) || "";
      setSelectedImage(initialImage);

      if (data.sizes && data.sizes.length > 0) {
        setSelectedSize(data.sizes[0]);
      }

      if (data.colors && data.colors.length > 0) {
        setSelectedColor(data.colors[0]);
      }
      setError(null);
    } catch (error) {
      console.error("Failed to fetch product:", error);
      // Log more details about the error
      if (error.response) {
        console.error("Error status:", error.response.status);
        console.error("Error data:", error.response.data);
        if (error.response.status === 404) {
          setError(
            "Product not found. This product may have been removed or the link is invalid.",
          );
        } else if (error.response.status === 400) {
          setError("Invalid product link. Please check the URL and try again.");
        } else {
          setError("Failed to load product. Please try again later.");
        }
      } else {
        setError("Network error. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    setReviewsLoading(true);
    try {
      console.log("Fetching reviews for product ID:", id);
      const response = await getProductReviews(id);
      console.log("Full API response:", response);
      console.log("Response data:", response.data);

      // Handle different response structures
      let reviewsData = [];
      if (response.data.success && response.data.data) {
        if (response.data.data.reviews) {
          reviewsData = response.data.data.reviews;
        } else if (Array.isArray(response.data.data)) {
          reviewsData = response.data.data;
        }
      }

      console.log("Extracted reviews:", reviewsData);
      console.log("Number of reviews:", reviewsData.length);

      // Ensure reviews is always an array
      setReviews(Array.isArray(reviewsData) ? reviewsData : []);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      console.error("Error response:", error.response);
      setReviews([]);
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product.sizes?.length > 0 && !selectedSize) {
      alert("Please select a size");
      return;
    }
    if (product.colors?.length > 0 && !selectedColor) {
      alert("Please select a color");
      return;
    }
    setIsAdding(true);
    addToCart(product, quantity, selectedImage, selectedSize, selectedColor);
    setTimeout(() => setIsAdding(false), 1500);
  };

  const handleBuyNow = () => {
    if (product.sizes?.length > 0 && !selectedSize) {
      alert("Please select a size");
      return;
    }
    if (product.colors?.length > 0 && !selectedColor) {
      alert("Please select a color");
      return;
    }
    addToCart(product, quantity, selectedImage, selectedSize, selectedColor);
    navigate("/cart");
  };

  // Prepare images for slideshow
  const allImages = [];
  if (product?.images?.length > 0) {
    allImages.push(...product.images);
  } else if (product?.image) {
    allImages.push(product.image);
  }

  const fallbackImage =
    "https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=600&h=600&fit=crop";

  // Use fallback if no images available
  const displayImages = allImages.length > 0 ? allImages : [fallbackImage];

  if (loading) return <Loading text="Loading product..." />;

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{error}</h2>
          <p className="text-gray-600 mb-6">
            {error.includes("not found")
              ? "The product you're looking for might have been removed, is out of stock, or the link is invalid."
              : "There was an issue loading this product. Please try refreshing the page or go back to browse other products."}
          </p>
          {redirectCountdown && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-700 text-sm">
                Redirecting to home page in {redirectCountdown} seconds...
              </p>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-primary">
              Back to Home
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="btn-secondary"
            >
              Refresh Page
            </button>
          </div>

          {/* Suggested Products */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Browse Our Categories Instead
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link
                to="/mens"
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
              >
                <div className="text-2xl mb-2">👔</div>
                <span className="text-sm font-medium text-gray-700">
                  Men's Fashion
                </span>
              </Link>
              <Link
                to="/womens"
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
              >
                <div className="text-2xl mb-2">👗</div>
                <span className="text-sm font-medium text-gray-700">
                  Women's Fashion
                </span>
              </Link>
              <Link
                to="/electronics"
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
              >
                <div className="text-2xl mb-2">📱</div>
                <span className="text-sm font-medium text-gray-700">
                  Electronics
                </span>
              </Link>
              <Link
                to="/baby"
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
              >
                <div className="text-2xl mb-2">🍼</div>
                <span className="text-sm font-medium text-gray-700">
                  Baby & Kids
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Product not found
          </h2>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Back to Home"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Link>
        <nav className="flex items-center space-x-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-primary-500">
            Home
          </Link>
          <span>→</span>
          <span className="text-gray-900 font-medium truncate">
            {product.title}
          </span>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Auto Slideshow */}
          <AutoSlideshow
            images={displayImages}
            autoPlay={displayImages.length > 1}
            interval={5000}
            showDots={displayImages.length > 1}
            showArrows={displayImages.length > 1}
            className="rounded-2xl"
            aspectRatio="aspect-square"
          />

          {/* Thumbnail Gallery */}
          {displayImages.length > 1 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700">
                Product Images ({displayImages.length})
              </h4>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {displayImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all hover:shadow-md ${
                      selectedImage === img
                        ? "border-primary-500 shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Image Actions */}
          {displayImages.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={() =>
                  window.open(selectedImage || displayImages[0], "_blank")
                }
                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                View Full Size
              </button>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {product.title}
          </h1>

          <div className="flex items-center space-x-4 mb-6">
            <span className="text-4xl font-bold text-primary-500">
              ${product.price?.toFixed(2)}
            </span>
            <span
              className={`px-3 py-1 text-sm font-medium rounded-full ${
                product.stock > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.stock > 0
                ? `In Stock (${product.stock})`
                : "Out of Stock"}
            </span>
          </div>

          {/* Description */}
          {product.description && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  Select Size
                </h3>
                {product.sizeChart && (
                  <button
                    onClick={() => setShowSizeChart(true)}
                    className="text-primary-500 text-sm font-medium hover:underline"
                  >
                    Size Chart
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border-2 font-medium transition ${
                      selectedSize === size
                        ? "border-primary-500 bg-primary-50 text-primary-700"
                        : "border-gray-300 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Select Color
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 font-medium transition hover:shadow-sm ${
                      selectedColor?.name === color.name
                        ? "border-primary-500 bg-primary-50 text-primary-700 shadow-sm"
                        : "border-gray-300 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-full border-2 border-gray-300 flex-shrink-0"
                      style={{ backgroundColor: color.value }}
                    />
                    <span>{color.name}</span>
                    {selectedColor?.name === color.name && (
                      <svg
                        className="w-4 h-4 text-primary-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>

              {/* Selected Color Display */}
              {selectedColor && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Selected:</span>
                    <div
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: selectedColor.value }}
                    />
                    <span className="font-medium text-gray-900">
                      {selectedColor.name}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quantity & Actions */}
          <div className="border-t border-gray-200 pt-6 mt-auto">
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-gray-700 font-medium">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-lg"
                >
                  −
                </button>
                <span className="w-16 text-center font-semibold text-lg">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  disabled={quantity >= product.stock}
                  className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-lg disabled:opacity-50"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || isAdding}
                className={`flex-1 py-3.5 rounded-xl font-semibold text-lg transition flex items-center justify-center gap-2 ${
                  isAdding
                    ? "bg-green-500 text-white"
                    : product.stock === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-primary-500 hover:bg-primary-600 text-white"
                }`}
              >
                {isAdding ? "✓ Added!" : "Add to Cart"}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex-1 py-3.5 rounded-xl font-semibold text-lg border-2 border-primary-500 text-primary-500 hover:bg-primary-50 disabled:opacity-50"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 pt-6 border-t">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg
                    className="w-5 h-5 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                </div>
                <p className="text-xs text-gray-600">Free Shipping</p>
              </div>
              <div className="p-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg
                    className="w-5 h-5 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <p className="text-xs text-gray-600">30-Day Returns</p>
              </div>
              <div className="p-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg
                    className="w-5 h-5 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <p className="text-xs text-gray-600">Secure Payment</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Size Chart Modal */}
      {showSizeChart && product.sizeChart && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowSizeChart(false)}
        >
          <div
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Size Chart</h3>
              <button
                onClick={() => setShowSizeChart(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <img
              src={product.sizeChart}
              alt="Size Chart"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Reviews Section - Collapsible */}
      <div className="mt-16 border-t pt-12">
        {/* Debug Info - Remove after testing */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
            <p>
              <strong>Debug Info:</strong>
            </p>
            <p>Reviews Loading: {reviewsLoading ? "Yes" : "No"}</p>
            <p>Reviews Count: {reviews.length}</p>
            <p>Reviews Array: {Array.isArray(reviews) ? "Yes" : "No"}</p>
            <p>Show All Reviews: {showAllReviews ? "Yes" : "No"}</p>
          </div>
        )}

        {/* Reviews Header - Always Visible */}
        <button
          onClick={() => setShowAllReviews(!showAllReviews)}
          className="w-full flex items-center justify-between p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all mb-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-yellow-600 dark:text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div className="text-left">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Customer Reviews
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {Array.isArray(reviews) ? reviews.length : 0} review
                {reviews.length !== 1 ? "s" : ""} from verified buyers
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-800 hidden sm:block">
              💡 Write reviews after delivery
            </div>
            <svg
              className={`w-6 h-6 text-gray-400 transition-transform ${
                showAllReviews ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </button>

        {/* Reviews Content - Collapsible */}
        {showAllReviews && (
          <div className="space-y-4 animate-fadeIn">
            {reviewsLoading ? (
              <div className="text-center py-8">
                <Loading text="Loading reviews..." />
              </div>
            ) : !Array.isArray(reviews) || reviews.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <svg
                  className="w-16 h-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No reviews yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Be the first to purchase and review this product!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {Array.isArray(reviews) &&
                  reviews.map((review) => (
                    <div
                      key={review._id}
                      className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 rounded-full flex items-center justify-center">
                            <span className="text-primary-600 dark:text-primary-400 font-semibold text-lg">
                              {review.userName?.charAt(0).toUpperCase() || "U"}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {review.userName || "Anonymous"}
                            </p>
                            <div className="flex items-center gap-2">
                              <StarRating rating={review.rating} size="sm" />
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {new Date(review.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  },
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded-full">
                          Verified Purchase
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {review.comment}
                      </p>

                      {/* Admin Reply */}
                      {review.adminReply && (
                        <div className="mt-4 ml-8 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            <span className="text-sm font-semibold text-blue-900 dark:text-blue-300">
                              Admin Response
                            </span>
                            <span className="text-xs text-blue-600 dark:text-blue-400">
                              {new Date(
                                review.adminRepliedAt,
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <p className="text-sm text-blue-900 dark:text-blue-200 leading-relaxed">
                            {review.adminReply}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
