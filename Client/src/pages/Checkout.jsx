import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import {
  createOrder,
  getDefaultAddress,
  getUserAddresses,
} from "../services/api";
import { auth } from "../firebase/firebase.config";
import CouponInput from "../components/CouponInput";
import { useNotifications } from "../context/NotificationContext";

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [showAddressSelector, setShowAddressSelector] = useState(false);
  const [addressLoaded, setAddressLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    area: "",
    zipCode: "",
    paymentMethod: "cod",
    specialInstructions: "",
  });

  // Calculate totals with coupon
  const subtotal = cartTotal;
  const discountAmount = appliedCoupon?.discountAmount || 0;
  const deliveryCharge = subtotal - discountAmount < 100 ? 100 : 0;
  const finalTotal = subtotal - discountAmount + deliveryCharge;

  // Fetch default address and set user email on mount
  useEffect(() => {
    const fetchDefaultAddress = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        // Set user's email and name from Firebase auth
        setFormData((prev) => ({
          ...prev,
          email: user.email || prev.email,
          name: user.displayName || prev.name,
        }));

        // Try to get default address
        try {
          const response = await getDefaultAddress();
          if (response.data.success && response.data.data) {
            setDefaultAddress(response.data.data);
          }
        } catch (error) {
          // If no default address, fetch all addresses
          if (error.response?.status === 404) {
            const addressesResponse = await getUserAddresses();
            if (addressesResponse.data.data?.length > 0) {
              setSavedAddresses(addressesResponse.data.data);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
      }
    };

    fetchDefaultAddress();
  }, []);

  // Auto-fill form with default address
  const loadAddress = (address) => {
    setFormData({
      ...formData,
      name: address.name,
      phone: address.phone,
      address: address.address,
      city: address.city,
      area: address.area,
      zipCode: address.zipCode || "",
    });
    setAddressLoaded(true);
    setShowAddressSelector(false);
  };

  // Load all saved addresses
  const fetchSavedAddresses = async () => {
    try {
      const response = await getUserAddresses();
      setSavedAddresses(response.data.data || []);
      setShowAddressSelector(true);
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCouponApplied = (couponData) => {
    setAppliedCoupon(couponData);
  };

  const handleCouponRemoved = () => {
    setAppliedCoupon(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if user is authenticated
      const user = auth.currentUser;
      if (!user) {
        alert("Please log in to place an order");
        navigate("/login");
        return;
      }

      // Validate required fields
      if (
        !formData.name ||
        !formData.phone ||
        !formData.address ||
        !formData.city
      ) {
        alert("Please fill in all required fields");
        setLoading(false);
        return;
      }

      const orderData = {
        products: cart.map((item) => ({
          productId: item._id, // This is correct - _id is the product's MongoDB ObjectId
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          selectedSize: item.selectedSize || null,
          selectedColor: item.selectedColor || null,
          image: item.selectedImage || item.image,
        })),
        total: finalTotal, // Use finalTotal instead of subtotal to include discounts and delivery
        subtotal: subtotal,
        shippingInfo: {
          name: formData.name,
          email: user.email || formData.email, // Always use authenticated user's email
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          area: formData.area,
          zipCode: formData.zipCode,
        },
        paymentMethod: formData.paymentMethod,
        specialInstructions: formData.specialInstructions,
        couponCode: appliedCoupon?.code || null,
      };

      console.log("Cart items:", cart);
      console.log("Form data:", formData);
      console.log("Applied coupon:", appliedCoupon);
      console.log("Submitting order:", orderData);

      const response = await createOrder(orderData);
      console.log("Order response:", response);

      // Get order ID safely
      const orderId = response.data?.data?._id || response.data?._id || "NEW";
      const orderIdShort =
        orderId !== "NEW" ? orderId.slice(-8).toUpperCase() : "NEW";

      // Add notification for successful order
      addNotification({
        type: "order",
        title: "Order Placed Successfully!",
        message: `Your order #${orderIdShort} has been placed and is being processed.`,
        link: "/orders",
      });

      clearCart();
      navigate("/orders", { state: { orderSuccess: true } });
    } catch (error) {
      console.error("Order failed:", error);
      console.error("Error details:", error.response?.data);

      let errorMessage = "Failed to place order. Please try again.";

      if (error.response?.status === 401) {
        errorMessage = "Please log in to place an order";
        navigate("/login");
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }

      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="text-center bg-white rounded-2xl shadow-xl p-12 max-w-md">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Add some amazing products to get started!
          </p>
          <Link to="/" className="btn-primary inline-block">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/cart"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Back to Cart"
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
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Secure Checkout
              </h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <svg
                className="w-4 h-4 text-green-500"
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
              SSL Secured
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          {[
            { step: 1, title: "Shipping", icon: "📦" },
            { step: 2, title: "Payment", icon: "💳" },
            { step: 3, title: "Review", icon: "✅" },
          ].map((item, index) => (
            <div key={item.step} className="flex items-center">
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full font-semibold text-sm transition-all ${
                  step >= item.step
                    ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
              </div>
              <div className="ml-3 mr-8">
                <p
                  className={`text-sm font-medium ${step >= item.step ? "text-primary-600" : "text-gray-500"}`}
                >
                  Step {item.step}
                </p>
                <p
                  className={`text-xs ${step >= item.step ? "text-gray-900" : "text-gray-400"}`}
                >
                  {item.title}
                </p>
              </div>
              {index < 2 && (
                <div
                  className={`w-16 h-1 rounded-full mr-8 ${step > item.step ? "bg-gradient-to-r from-primary-500 to-secondary-500" : "bg-gray-200"}`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Information */}
              <div className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-blue-600"
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
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Delivery Information
                    </h2>
                  </div>

                  {/* Load Saved Address Button */}
                  <button
                    type="button"
                    onClick={fetchSavedAddresses}
                    className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary-50 transition-colors"
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
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>
                    Use Saved Address
                  </button>
                </div>

                {/* Default Address Suggestion */}
                {defaultAddress && !addressLoaded && (
                  <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-primary-50 border border-blue-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-blue-900 mb-1">
                          💡 Use your default address?
                        </p>
                        <p className="text-xs text-blue-700 mb-2">
                          {defaultAddress.name} • {defaultAddress.phone}
                          <br />
                          {defaultAddress.address}, {defaultAddress.area},{" "}
                          {defaultAddress.city}
                        </p>
                        <button
                          type="button"
                          onClick={() => loadAddress(defaultAddress)}
                          className="text-xs font-semibold text-primary-600 hover:text-primary-700 bg-white px-3 py-1.5 rounded-lg border border-primary-200 hover:border-primary-300 transition-colors"
                        >
                          Use This Address
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Address Loaded Success Message */}
                {addressLoaded && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-sm text-green-800 font-medium">
                      Address loaded successfully! You can edit if needed.
                    </p>
                  </div>
                )}

                {/* Saved Addresses Selector Modal */}
                {showAddressSelector && savedAddresses.length > 0 && (
                  <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-gray-900">
                        Select a saved address
                      </h3>
                      <button
                        type="button"
                        onClick={() => setShowAddressSelector(false)}
                        className="text-gray-400 hover:text-gray-600"
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {savedAddresses.map((addr) => (
                        <button
                          key={addr._id}
                          type="button"
                          onClick={() => loadAddress(addr)}
                          className="w-full text-left p-3 bg-white border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-gray-900">
                                {addr.name}
                                {addr.isDefault && (
                                  <span className="ml-2 text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">
                                    Default
                                  </span>
                                )}
                              </p>
                              <p className="text-xs text-gray-600 mt-1">
                                {addr.phone}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {addr.address}, {addr.area}, {addr.city}
                              </p>
                            </div>
                            <svg
                              className="w-5 h-5 text-primary-600 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        readOnly
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-700 cursor-not-allowed focus:outline-none"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <svg
                          className="w-5 h-5 text-gray-400"
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
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Name from your account (read-only)
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+880 1XXX-XXXXXX"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        readOnly
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-700 cursor-not-allowed focus:outline-none"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <svg
                          className="w-5 h-5 text-gray-400"
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
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Email from your account (read-only)
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City *
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select City</option>
                      <option value="Dhaka">Dhaka</option>
                      <option value="Chittagong">Chittagong</option>
                      <option value="Sylhet">Sylhet</option>
                      <option value="Rajshahi">Rajshahi</option>
                      <option value="Khulna">Khulna</option>
                      <option value="Barisal">Barisal</option>
                      <option value="Rangpur">Rangpur</option>
                      <option value="Mymensingh">Mymensingh</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Area/Thana *
                    </label>
                    <input
                      type="text"
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      required
                      placeholder="e.g., Dhanmondi, Gulshan"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      placeholder="1000"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Complete Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows="3"
                      placeholder="House/Flat no, Road no, Block, etc."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>
                </div>
              </div>
              {/* Payment Method */}
              <div className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-green-600"
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
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Payment Method
                  </h2>
                </div>

                <div className="space-y-3">
                  <label
                    className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50 ${
                      formData.paymentMethod === "cod"
                        ? "border-primary-500 bg-primary-50 shadow-sm"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleChange}
                      className="w-5 h-5 text-primary-500 border-gray-300 focus:ring-primary-500"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">💵</span>
                        <div>
                          <span className="font-semibold text-gray-900">
                            Cash on Delivery
                          </span>
                          <p className="text-sm text-gray-500">
                            Pay when you receive your order
                          </p>
                        </div>
                      </div>
                    </div>
                    {formData.paymentMethod === "cod" && (
                      <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
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
                    )}
                  </label>

                  <label
                    className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50 ${
                      formData.paymentMethod === "bkash"
                        ? "border-primary-500 bg-primary-50 shadow-sm"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bkash"
                      checked={formData.paymentMethod === "bkash"}
                      onChange={handleChange}
                      className="w-5 h-5 text-primary-500 border-gray-300 focus:ring-primary-500"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">📱</span>
                        <div>
                          <span className="font-semibold text-gray-900">
                            bKash Payment
                          </span>
                          <p className="text-sm text-gray-500">
                            Pay securely with bKash mobile banking
                          </p>
                        </div>
                      </div>
                    </div>
                    {formData.paymentMethod === "bkash" && (
                      <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
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
                    )}
                  </label>

                  <label
                    className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50 ${
                      formData.paymentMethod === "nagad"
                        ? "border-primary-500 bg-primary-50 shadow-sm"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="nagad"
                      checked={formData.paymentMethod === "nagad"}
                      onChange={handleChange}
                      className="w-5 h-5 text-primary-500 border-gray-300 focus:ring-primary-500"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">💳</span>
                        <div>
                          <span className="font-semibold text-gray-900">
                            Nagad Payment
                          </span>
                          <p className="text-sm text-gray-500">
                            Pay with Nagad digital wallet
                          </p>
                        </div>
                      </div>
                    </div>
                    {formData.paymentMethod === "nagad" && (
                      <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
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
                    )}
                  </label>
                </div>
              </div>

              {/* Special Instructions */}
              <div className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-purple-600"
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
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Special Instructions
                  </h2>
                </div>
                <textarea
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Any special delivery instructions? (Optional)"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                />
              </div>
            </form>
          </div>
          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={`${item._id}-${item.selectedSize || "no-size"}`}
                    className="flex gap-4 p-3 bg-gray-50 rounded-xl"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm truncate">
                        {item.title}
                      </h4>
                      {item.selectedSize && (
                        <p className="text-xs text-gray-500">
                          Size: {item.selectedSize}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </span>
                        <span className="font-bold text-primary-600">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Input */}
              <div className="mb-6">
                <CouponInput
                  orderTotal={cartTotal}
                  onCouponApplied={handleCouponApplied}
                  onCouponRemoved={handleCouponRemoved}
                  appliedCoupon={appliedCoupon}
                />
              </div>

              {/* Pricing Breakdown */}
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>
                    Subtotal (
                    {cart.reduce((sum, item) => sum + item.quantity, 0)} items)
                  </span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center gap-2">
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
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                      Coupon Discount ({appliedCoupon.code})
                    </span>
                    <span className="font-semibold">
                      -${discountAmount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-2">
                    Delivery Charge
                    {deliveryCharge === 0 && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                        FREE
                      </span>
                    )}
                  </span>
                  <span
                    className={
                      deliveryCharge === 0 ? "line-through text-gray-400" : ""
                    }
                  >
                    ${deliveryCharge.toFixed(2)}
                  </span>
                </div>

                {cartTotal < 100 && !appliedCoupon && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-xs text-amber-700">
                      💡 Add ${(100 - cartTotal).toFixed(2)} more to get FREE
                      delivery!
                    </p>
                  </div>
                )}

                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary-600">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full mt-6 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-bold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Processing Order...
                  </>
                ) : (
                  <>
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Place Order - ৳{finalTotal.toFixed(2)}
                  </>
                )}
              </button>

              {/* Security Badge */}
              <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                <div className="flex items-center gap-2 text-sm">
                  <svg
                    className="w-5 h-5 text-green-600"
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
                  <div>
                    <p className="font-semibold text-green-800">
                      Secure Checkout
                    </p>
                    <p className="text-xs text-green-600">
                      Your information is protected with SSL encryption
                    </p>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-blue-600 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="text-sm">
                    <p className="font-semibold text-blue-800">
                      Delivery Information
                    </p>
                    <ul className="text-xs text-blue-600 mt-1 space-y-1">
                      <li>• Standard delivery: 2-5 business days</li>
                      <li>• Free delivery on orders over $100</li>
                      <li>• Cash on delivery available</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
