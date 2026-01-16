import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Profile() {
  const { user, isAdmin } = useAuth();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="card p-6 mb-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-semibold">
              {user?.displayName || user?.email}
            </h2>
            <p className="text-gray-600">{user?.email}</p>
            {isAdmin && (
              <span className="inline-block mt-2 px-3 py-1 bg-primary text-white text-sm rounded-full">
                Admin
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/orders" className="card p-6 hover:shadow-xl transition">
          <h3 className="text-xl font-semibold mb-2">My Orders</h3>
          <p className="text-gray-600">View your order history</p>
        </Link>

        {isAdmin && (
          <Link
            to="/admin"
            className="card p-6 hover:shadow-xl transition bg-primary text-white"
          >
            <h3 className="text-xl font-semibold mb-2">Admin Dashboard</h3>
            <p className="text-gray-100">Manage products and orders</p>
          </Link>
        )}
      </div>
    </div>
  );
}
