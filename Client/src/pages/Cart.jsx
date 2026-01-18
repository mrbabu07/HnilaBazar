import { Link, useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate("/login", { state: { from: { pathname: "/checkout" } } });
      return;
    }
    navigate("/checkout");
  };

  const getItemKey = (item) =>
    `${item._id}_${item.selectedSize || "no-size"}_${item.selectedColor?.name || item.selectedColor || "no-color"}`;

  // Utility function to safely render color
  const renderColor = (color) => {
    if (!color) return null;
    if (typeof color === "string") return color;
    if (typeof color === "object" && color.name) return color.name;
    return "Unknown Color";
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/" className="btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => {
            const displayImage =
              item.selectedImage ||
              item.image ||
              (item.images && item.images[0]) ||
              "https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=200";

            const allImages =
              item.images && item.images.length > 0
                ? item.images
                : item.image
                  ? [item.image]
                  : [];

            return (
              <div key={getItemKey(item)} className="card p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Image Section */}
                  <div className="w-full sm:w-40 flex-shrink-0">
                    {/* Main Image */}
                    <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-xl overflow-hidden mb-2">
                      <img
                        src={displayImage}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Image Gallery - Show if multiple images */}
                    {allImages.length > 1 && (
                      <div className="flex gap-1 overflow-x-auto">
                        {allImages.slice(0, 4).map((img, index) => (
                          <div
                            key={index}
                            className={`w-8 h-8 rounded border-2 overflow-hidden flex-shrink-0 ${
                              img === displayImage
                                ? "border-primary-500"
                                : "border-gray-200"
                            }`}
                          >
                            <img
                              src={img}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                        {allImages.length > 4 && (
                          <div className="w-8 h-8 rounded border-2 border-gray-200 bg-gray-100 flex items-center justify-center">
                            <span className="text-xs text-gray-500">
                              +{allImages.length - 4}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                      <div>
                        <Link
                          to={`/product/${item._id}`}
                          className="font-semibold text-gray-900 mb-1 line-clamp-2 hover:text-primary-600 transition-colors"
                        >
                          {item.title}
                        </Link>

                        {/* Selected Size */}
                        {item.selectedSize && (
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm text-gray-500">Size:</span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-md font-medium">
                              {item.selectedSize}
                            </span>
                          </div>
                        )}

                        {/* Selected Color */}
                        {item.selectedColor && (
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm text-gray-500">
                              Color:
                            </span>
                            <div className="flex items-center gap-2 px-2 py-1 bg-gray-100 rounded-md">
                              {typeof item.selectedColor === "object" &&
                                item.selectedColor.value && (
                                  <div
                                    className="w-4 h-4 rounded-full border border-gray-300"
                                    style={{
                                      backgroundColor: item.selectedColor.value,
                                    }}
                                  />
                                )}
                              <span className="text-gray-700 text-sm font-medium">
                                {renderColor(item.selectedColor)}
                              </span>
                            </div>
                          </div>
                        )}

                        <p className="text-primary-500 font-bold text-lg">
                          ${item.price?.toFixed(2)}
                        </p>
                      </div>
                      <p className="text-lg font-bold text-gray-900 sm:text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item._id,
                              item.quantity - 1,
                              item.selectedSize,
                              item.selectedColor,
                            )
                          }
                          className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-lg transition-colors"
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
                              d="M20 12H4"
                            />
                          </svg>
                        </button>
                        <span className="w-12 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item._id,
                              item.quantity + 1,
                              item.selectedSize,
                              item.selectedColor,
                            )
                          }
                          className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-lg transition-colors"
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
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </button>
                      </div>

                      <button
                        onClick={() =>
                          removeFromCart(
                            item._id,
                            item.selectedSize,
                            item.selectedColor,
                          )
                        }
                        className="flex items-center space-x-1 text-red-500 hover:text-red-600 transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        <span className="text-sm font-medium">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>
                  Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                  items)
                </span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="flex items-center gap-2">
                  Delivery Charge
                  {cartTotal >= 100 && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                      FREE
                    </span>
                  )}
                </span>
                <span
                  className={`font-medium ${cartTotal >= 100 ? "line-through text-gray-400" : ""}`}
                >
                  ${cartTotal < 100 ? "100.00" : "0.00"}
                </span>
              </div>

              {/* Coupon Teaser */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-green-900 mb-1">
                      💰 Have a coupon code?
                    </p>
                    <p className="text-xs text-green-700">
                      You can apply your coupon code at checkout to save on your
                      order!
                    </p>
                  </div>
                </div>
              </div>

              {cartTotal < 100 && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🚚</span>
                    <p className="text-sm font-semibold text-amber-800">
                      Almost there for FREE delivery!
                    </p>
                  </div>
                  <p className="text-xs text-amber-700">
                    Add{" "}
                    <span className="font-bold">
                      ${(100 - cartTotal).toFixed(2)}
                    </span>{" "}
                    more to get free delivery
                  </p>
                  <div className="mt-2 bg-amber-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-amber-400 to-orange-400 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min((cartTotal / 100) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-primary-500">
                    ${(cartTotal + (cartTotal < 100 ? 100 : 0)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full btn-primary py-3 mb-4"
            >
              Proceed to Checkout
            </button>

            <Link
              to="/"
              className="block text-center text-gray-600 hover:text-primary-500 font-medium transition-colors"
            >
              Continue Shopping
            </Link>

            {/* Security Badge */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
