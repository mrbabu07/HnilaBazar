import { useState, useEffect } from "react";
import { getAllOrders, updateOrderStatus } from "../../services/api";
import Loading from "../../components/Loading";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getAllOrders();
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
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update order status");
    }
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="card p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-semibold">Order ID: {order._id}</p>
                <p className="text-sm text-gray-600">User: {order.userId}</p>
                <p className="text-sm text-gray-600">
                  Date: {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    statusColors[order.status]
                  }`}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {order.products.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>
                    {item.title} x {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 flex justify-between font-bold">
              <span>Total</span>
              <span className="text-primary">${order.total.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
