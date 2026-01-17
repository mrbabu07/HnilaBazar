import { useState } from "react";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import AutoSlideshow from "./AutoSlideshow";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    const imageToUse =
      product.image || (product.images && product.images[0]) || fallbackImage;
    addToCart(product, 1, imageToUse);
    setTimeout(() => setIsAdding(false), 1000);
  };

  const fallbackImage =
    "https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=400&h=400&fit=crop";

  // Prepare images for slideshow
  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : product.image
        ? [product.image]
        : [fallbackImage];

  return (
    <Link to={`/product/${product._id}`} className="group">
      <div className="card overflow-hidden">
        {/* Image Container with Auto Slideshow */}
        <div className="relative">
          <AutoSlideshow
            images={productImages}
            autoPlay={productImages.length > 1}
            interval={4000}
            showDots={productImages.length > 1}
            showArrows={false}
            className="hover:scale-105 transition-transform duration-500"
            aspectRatio="aspect-square"
          />

          {/* Stock Badge */}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded-full z-10">
              Only {product.stock} left
            </span>
          )}
          {product.stock === 0 && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full z-10">
              Out of Stock
            </span>
          )}

          {/* Quick Add Button */}
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || isAdding}
              className={`w-full py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                isAdding
                  ? "bg-green-500 text-white"
                  : product.stock === 0
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-white text-gray-900 hover:bg-primary-500 hover:text-white"
              }`}
            >
              {isAdding ? (
                <span className="flex items-center justify-center space-x-2">
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Added!</span>
                </span>
              ) : product.stock === 0 ? (
                "Out of Stock"
              ) : (
                "Add to Cart"
              )}
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 group-hover:text-primary-500 transition-colors">
            {product.title}
          </h3>

          <div className="flex items-center justify-between mt-2">
            <span className="text-xl font-bold text-primary-500">
              ${product.price?.toFixed(2)}
            </span>
            {product.stock > 0 && (
              <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
                In Stock
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
