import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllOrders, updateOrderStatus } from "../../services/api";
import Loading from "../../components/Loading";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Utility function to safely render color
  const renderColor = (color) => {
    if (!color) return null;
    if (typeof color === "string") return color;
    if (typeof color === "object" && color.name) return color.name;
    return "Unknown Color";
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getAllOrders();
      console.log("📋 Fetched orders:", response.data.data);
      setOrders(response.data.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order,
        ),
      );
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update order status");
    }
  };

  const statusConfig = {
    pending: {
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      icon: "⏳",
    },
    processing: {
      color: "bg-blue-100 text-blue-800 border-blue-200",
      icon: "🔄",
    },
    shipped: {
      color: "bg-purple-100 text-purple-800 border-purple-200",
      icon: "📦",
    },
    delivered: {
      color: "bg-green-100 text-green-800 border-green-200",
      icon: "✅",
    },
    cancelled: { color: "bg-red-100 text-red-800 border-red-200", icon: "❌" },
  };

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link
              to="/admin"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Back to Dashboard"
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
              <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
              <p className="text-gray-600">Manage and track customer orders</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {stats.pending}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-sm text-gray-500">Processing</p>
            <p className="text-2xl font-bold text-blue-600">
              {stats.processing}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-sm text-gray-500">Delivered</p>
            <p className="text-2xl font-bold text-green-600">
              {stats.delivered}
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-2 mb-6 flex flex-wrap gap-2">
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
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === status
                  ? "bg-primary-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No orders found
            </h3>
            <p className="text-gray-600">
              {filter === "all"
                ? "No orders have been placed yet"
                : `No ${filter} orders`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                {/* Order Header */}
                <div
                  className="p-6 cursor-pointer hover:bg-gray-50 transition"
                  onClick={() =>
                    setExpandedOrder(
                      expandedOrder === order._id ? null : order._id,
                    )
                  }
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                        {statusConfig[order.status]?.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <p className="font-semibold text-gray-900">
                            Order #{order._id.slice(-8).toUpperCase()}
                          </p>
                          {order.paymentMethod && (
                            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                              {order.paymentMethod.toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>
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
                          {order.shippingInfo?.name && (
                            <>
                              <span>•</span>
                              <span>{order.shippingInfo.name}</span>
                            </>
                          )}
                          {order.shippingInfo?.city && (
                            <>
                              <span>•</span>
                              <span>{order.shippingInfo.city}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-gray-500">
                            {order.products?.length || 0} items
                          </span>
                          {order.products?.some(
                            (item) => item.selectedSize || item.selectedColor,
                          ) && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                              Customized Items
                            </span>
                          )}
                        </div>
                        <p className="font-bold text-lg text-primary-500">
                          ${order.total?.toFixed(2)}
                          {order.deliveryCharge > 0 && (
                            <span className="text-xs text-gray-500 ml-1">
                              (+${order.deliveryCharge.toFixed(2)} delivery)
                            </span>
                          )}
                        </p>
                      </div>
                      <select
                        value={order.status}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleStatusChange(order._id, e.target.value);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className={`px-3 py-2 rounded-lg text-sm font-semibold border ${
                          statusConfig[order.status]?.color
                        } cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <svg
                        className={`w-5 h-5 text-gray-400 transition ${
                          expandedOrder === order._id ? "rotate-180" : ""
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
                  </div>
                </div>

                {/* Expanded Order Details */}
                {expandedOrder === order._id && (
                  <div className="border-t bg-gray-50 p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Order Items with Details */}
                      <div className="lg:col-span-2">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-primary-500"
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
                          Order Items ({order.products?.length || 0})
                        </h4>
                        <div className="space-y-3">
                          {order.products?.map((item, index) => (
                            <div
                              key={index}
                              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
                            >
                              <div className="flex items-start gap-4">
                                {/* Product Image */}
                                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                  {item.image ? (
                                    <img
                                      src={item.image}
                                      alt={item.title}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
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
                                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                      </svg>
                                    </div>
                                  )}
                                </div>

                                {/* Product Details */}
                                <div className="flex-1">
                                  <h5 className="font-medium text-gray-900 mb-2">
                                    {item.title}
                                  </h5>
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <span className="text-gray-500">
                                        Quantity:
                                      </span>
                                      <span className="ml-2 font-medium text-gray-900">
                                        {item.quantity}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="text-gray-500">
                                        Unit Price:
                                      </span>
                                      <span className="ml-2 font-medium text-gray-900">
                                        ${item.price?.toFixed(2)}
                                      </span>
                                    </div>
                                    {item.selectedSize && (
                                      <div>
                                        <span className="text-gray-500">
                                          Size:
                                        </span>
                                        <span className="ml-2 font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-md text-xs">
                                          {item.selectedSize}
                                        </span>
                                      </div>
                                    )}
                                    {item.selectedColor && (
                                      <div>
                                        <span className="text-gray-500">
                                          Color:
                                        </span>
                                        <div className="ml-2 inline-flex items-center gap-2 font-medium text-gray-700 bg-gray-50 px-2 py-1 rounded-md text-xs">
                                          {typeof item.selectedColor ===
                                            "object" &&
                                            item.selectedColor.value && (
                                              <div
                                                className="w-3 h-3 rounded-full border border-gray-300"
                                                style={{
                                                  backgroundColor:
                                                    item.selectedColor.value,
                                                }}
                                              />
                                            )}
                                          {renderColor(item.selectedColor)}
                                        </div>
                                      </div>
                                    )}
                                    <div>
                                      <span className="text-gray-500">
                                        Subtotal:
                                      </span>
                                      <span className="ml-2 font-semibold text-gray-900">
                                        $
                                        {(
                                          (item.price || 0) *
                                          (item.quantity || 0)
                                        ).toFixed(2)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}

                          {/* Order Total Breakdown */}
                          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                            <h5 className="font-medium text-gray-900 mb-3">
                              Order Summary
                            </h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-500">Subtotal:</span>
                                <span className="text-gray-900">
                                  ${(order.subtotal || order.total)?.toFixed(2)}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">
                                  Delivery Charge:
                                </span>
                                <span className="text-gray-900">
                                  {order.deliveryCharge
                                    ? `$${order.deliveryCharge.toFixed(2)}`
                                    : "FREE"}
                                </span>
                              </div>
                              <div className="border-t pt-2 flex justify-between font-semibold">
                                <span className="text-gray-900">Total:</span>
                                <span className="text-primary-600">
                                  ${order.total?.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Customer & Shipping Information */}
                      <div className="space-y-6">
                        {/* Customer Details */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <svg
                              className="w-5 h-5 text-blue-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            Customer Information
                          </h4>
                          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm space-y-4">
                            {order.shippingInfo ? (
                              <>
                                {order.shippingInfo.name && (
                                  <div>
                                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                                      Full Name
                                    </span>
                                    <p className="text-sm font-medium text-gray-900 mt-1">
                                      {order.shippingInfo.name}
                                    </p>
                                  </div>
                                )}

                                <div className="grid grid-cols-1 gap-4">
                                  {order.shippingInfo.phone && (
                                    <div>
                                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                                        Phone Number
                                      </span>
                                      <p className="text-sm text-gray-900 mt-1">
                                        <a
                                          href={`tel:${order.shippingInfo.phone}`}
                                          className="text-blue-600 hover:underline font-medium"
                                        >
                                          {order.shippingInfo.phone}
                                        </a>
                                      </p>
                                    </div>
                                  )}

                                  {order.shippingInfo.email && (
                                    <div>
                                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                                        Email Address
                                      </span>
                                      <p className="text-sm text-gray-900 mt-1">
                                        <a
                                          href={`mailto:${order.shippingInfo.email}`}
                                          className="text-blue-600 hover:underline"
                                        >
                                          {order.shippingInfo.email}
                                        </a>
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </>
                            ) : (
                              <div className="text-center py-6">
                                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                  <svg
                                    className="w-6 h-6 text-yellow-600"
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
                                <p className="text-sm font-medium text-gray-900 mb-1">
                                  No Customer Information
                                </p>
                                <p className="text-xs text-gray-500">
                                  This order was placed before customer info
                                  collection was implemented
                                </p>
                              </div>
                            )}

                            {/* Firebase User ID for reference */}
                            <div className="pt-3 border-t border-gray-100">
                              <span className="text-xs text-gray-500 uppercase tracking-wide">
                                System Reference
                              </span>
                              <p className="font-mono text-xs text-gray-600 bg-gray-50 p-2 rounded mt-1">
                                User ID: {order.userId}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Shipping Address */}
                        {order.shippingInfo && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                              <svg
                                className="w-5 h-5 text-green-500"
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
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                              Delivery Address
                            </h4>
                            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                              <div className="space-y-3">
                                {/* Address Details */}
                                {order.shippingInfo.address && (
                                  <div>
                                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                                      Street Address
                                    </span>
                                    <p className="text-sm text-gray-900 mt-1 leading-relaxed">
                                      {order.shippingInfo.address}
                                    </p>
                                  </div>
                                )}

                                {/* Location Details */}
                                <div className="grid grid-cols-2 gap-4">
                                  {order.shippingInfo.area && (
                                    <div>
                                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                                        Area/Thana
                                      </span>
                                      <p className="text-sm font-medium text-gray-900 mt-1">
                                        {order.shippingInfo.area}
                                      </p>
                                    </div>
                                  )}

                                  {order.shippingInfo.city && (
                                    <div>
                                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                                        City/District
                                      </span>
                                      <p className="text-sm font-medium text-gray-900 mt-1">
                                        {order.shippingInfo.city}
                                      </p>
                                    </div>
                                  )}
                                </div>

                                {order.shippingInfo.zipCode && (
                                  <div>
                                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                                      Postal Code
                                    </span>
                                    <p className="text-sm text-gray-900 mt-1">
                                      {order.shippingInfo.zipCode}
                                    </p>
                                  </div>
                                )}

                                {/* Complete Address for Shipping Label */}
                                <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                                      📦 Shipping Label Address
                                    </span>
                                    <button
                                      onClick={() => {
                                        const fullAddress = [
                                          order.shippingInfo.name,
                                          order.shippingInfo.phone,
                                          order.shippingInfo.address,
                                          order.shippingInfo.area,
                                          order.shippingInfo.city,
                                          order.shippingInfo.zipCode,
                                        ]
                                          .filter(Boolean)
                                          .join("\n");
                                        navigator.clipboard.writeText(
                                          fullAddress,
                                        );
                                        alert(
                                          "Shipping address copied to clipboard!",
                                        );
                                      }}
                                      className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                                    >
                                      <svg
                                        className="w-3 h-3"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                        />
                                      </svg>
                                      Copy
                                    </button>
                                  </div>
                                  <div className="text-sm text-gray-900 leading-relaxed whitespace-pre-line font-mono bg-white p-3 rounded border">
                                    {[
                                      order.shippingInfo.name,
                                      order.shippingInfo.phone,
                                      order.shippingInfo.address,
                                      order.shippingInfo.area +
                                        (order.shippingInfo.city
                                          ? `, ${order.shippingInfo.city}`
                                          : ""),
                                      order.shippingInfo.zipCode,
                                    ]
                                      .filter(Boolean)
                                      .join("\n")}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Payment & Additional Info */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <svg
                              className="w-5 h-5 text-purple-500"
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
                            Order Details
                          </h4>
                          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm space-y-3">
                            {order.paymentMethod && (
                              <div>
                                <span className="text-xs text-gray-500 uppercase tracking-wide">
                                  Payment Method
                                </span>
                                <p className="text-sm font-medium text-gray-900 mt-1 capitalize">
                                  {order.paymentMethod}
                                </p>
                              </div>
                            )}
                            <div>
                              <span className="text-xs text-gray-500 uppercase tracking-wide">
                                Order Date
                              </span>
                              <p className="text-sm text-gray-900 mt-1">
                                {new Date(order.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  },
                                )}
                              </p>
                            </div>
                            {order.specialInstructions && (
                              <div>
                                <span className="text-xs text-gray-500 uppercase tracking-wide">
                                  Special Instructions
                                </span>
                                <p className="text-sm text-gray-900 mt-1 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                                  {order.specialInstructions}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                          <h5 className="font-medium text-gray-900 mb-3">
                            Quick Actions
                          </h5>
                          <div className="space-y-2">
                            {order.shippingInfo?.phone && (
                              <a
                                href={`tel:${order.shippingInfo.phone}`}
                                className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm"
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
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                  />
                                </svg>
                                Call Customer
                              </a>
                            )}
                            {order.shippingInfo?.email && (
                              <a
                                href={`mailto:${order.shippingInfo.email}?subject=Order Update - ${order._id.slice(-8).toUpperCase()}`}
                                className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm"
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
                                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                  />
                                </svg>
                                Email Customer
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
