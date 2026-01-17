import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getUserOrders } from "../services/api";
import Loading from "../components/Loading";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const location = useLocation();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetchOrders();
    if (location.state?.orderSuccess) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getUserOrders();
      setOrders(response.data.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const statusConfig = {
    pending: {
      color:
        "bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-yellow-200",
      icon: "⏳",
      description: "Order received and being processed",
    },
    processing: {
      color:
        "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-200",
      icon: "🔄",
      description: "Order is being prepared",
    },
    shipped: {
      color:
        "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200",
      icon: "📦",
      description: "Order has been shipped",
    },
    delivered: {
      color:
        "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200",
      icon: "✅",
      description: "Order delivered successfully",
    },
    cancelled: {
      color:
        "bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-200",
      icon: "❌",
      description: "Order has been cancelled",
    },
  };

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  if (loading) return <Loading />;
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-xl shadow-lg animate-slide-up">
          <div className="flex items-center gap-3">
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
                d="M5 13l4 4L19 7"
              />
            </svg>
            <div>
              <p className="font-semibold">Order Placed Successfully!</p>
              <p className="text-sm opacity-90">
                You'll receive updates via SMS/Email
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
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
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  My Orders
                </h1>
                <p className="text-gray-600 mt-1">
                  Track and manage your orders
                </p>
              </div>
            </div>
            <Link to="/" className="btn-primary flex items-center gap-2">
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Filter Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border p-2 mb-8 flex flex-wrap gap-2">
          {[
            "all",
            "pending",
            "processing",
            "shipped",
            "delivered",
            "cancelled",
          ].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                filter === status
                  ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {status !== "all" && (
                <span className="ml-2 text-xs opacity-75">
                  ({orders.filter((o) => o.status === status).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {filter === "all" ? "No orders yet" : `No ${filter} orders`}
            </h3>
            <p className="text-gray-600 mb-6">
              {filter === "all"
                ? "Start shopping to see your orders here"
                : "Try selecting a different filter"}
            </p>
            <Link to="/" className="btn-primary inline-block">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-sm border hover:shadow-md transition-all overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">Order ID:</span>
                        <span className="font-mono font-bold text-gray-900 bg-white px-3 py-1 rounded-lg">
                          #{order._id.slice(-8).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">Date:</span>
                        <span className="font-semibold text-gray-900">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border ${statusConfig[order.status]?.color}`}
                      >
                        <span className="text-lg">
                          {statusConfig[order.status]?.icon}
                        </span>
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Order Content */}
                <div className="p-6">
                  {/* Status Description */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <p className="text-sm text-blue-800 font-medium">
                      📋 {statusConfig[order.status]?.description}
                    </p>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-4 mb-6">
                    {order.products.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                      >
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <svg
                              className="w-8 h-8 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                              />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate">
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span>Qty: {item.quantity}</span>
                            {item.selectedSize && (
                              <span>Size: {item.selectedSize}</span>
                            )}
                            <span>${item.price} each</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">
                            $
                            {((item.price || 0) * (item.quantity || 0)).toFixed(
                              2,
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Payment & Delivery Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Payment Method */}
                    <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
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
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                        Payment Method
                      </h4>
                      <p className="text-sm text-green-700 capitalize">
                        {order.paymentMethod === "cod"
                          ? "Cash on Delivery"
                          : order.paymentMethod}
                      </p>
                    </div>

                    {/* Delivery Address */}
                    {order.shippingInfo && (
                      <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
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
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                          </svg>
                          Delivery Address
                        </h4>
                        <div className="text-sm text-blue-700 space-y-1">
                          <p className="font-medium">
                            {order.shippingInfo.name}
                          </p>
                          <p>{order.shippingInfo.phone}</p>
                          <p>{order.shippingInfo.address}</p>
                          <p>
                            {order.shippingInfo.area}, {order.shippingInfo.city}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Special Instructions */}
                  {order.specialInstructions && (
                    <div className="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
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
                            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1l-4 4z"
                          />
                        </svg>
                        Special Instructions
                      </h4>
                      <p className="text-sm text-purple-700">
                        {order.specialInstructions}
                      </p>
                    </div>
                  )}

                  {/* Order Total */}
                  <div className="border-t pt-6">
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 space-y-3">
                      <div className="flex justify-between text-gray-600">
                        <span>
                          Subtotal (
                          {order.products.reduce(
                            (sum, item) => sum + item.quantity,
                            0,
                          )}{" "}
                          items)
                        </span>
                        <span>
                          ${(order.subtotal || order.total || 0).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Delivery Charge</span>
                        <span
                          className={
                            (order.deliveryCharge || 0) === 0
                              ? "text-green-600 font-medium"
                              : ""
                          }
                        >
                          {(order.deliveryCharge || 0) === 0
                            ? "FREE"
                            : `$${(order.deliveryCharge || 0).toFixed(2)}`}
                        </span>
                      </div>
                      <div className="border-t pt-3 flex justify-between text-xl font-bold">
                        <span>Total Paid</span>
                        <span className="text-primary-600">
                          ${(order.total || 0).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
