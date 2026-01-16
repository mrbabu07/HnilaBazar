import { Link, useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Add some products to get started</p>
        <Link to="/" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item._id} className="card p-4 flex gap-4">
              <img
                src={item.image || "https://via.placeholder.com/150"}
                alt={item.title}
                className="w-24 h-24 object-cover rounded"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-primary font-bold mb-2">${item.price}</p>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity - 1)
                      }
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-x border-gray-300">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="font-bold text-lg">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-20">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button onClick={handleCheckout} className="btn-primary w-full">
              Proceed to Checkout
            </button>

            <Link
              to="/"
              className="block text-center mt-4 text-gray-600 hover:text-primary"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
