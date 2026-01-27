import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../services/api";

export default function LowStockAlert({ threshold = 5 }) {
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    fetchLowStockProducts();
  }, [threshold]);

  const fetchLowStockProducts = async () => {
    try {
      const response = await getProducts();
      const products = response.data.data || [];

      const lowStock = products.filter(
        (product) => product.stock > 0 && product.stock <= threshold,
      );

      setLowStockProducts(lowStock);
    } catch (error) {
      console.error("Failed to fetch low stock products:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || lowStockProducts.length === 0 || dismissed) {
    return null;
  }

  return (
    <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-orange-600 dark:text-orange-400"
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
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-orange-800 dark:text-orange-400 mb-1">
              Low Stock Alert
            </h3>
            <p className="text-sm text-orange-700 dark:text-orange-300 mb-3">
              {lowStockProducts.length} product
              {lowStockProducts.length > 1 ? "s" : ""} running low on stock (≤
              {threshold} units)
            </p>

            <div className="space-y-2 mb-3">
              {lowStockProducts.slice(0, 3).map((product) => (
                <div
                  key={product._id}
                  className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-2"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={product.image || "/placeholder-product.jpg"}
                      alt={product.title}
                      className="w-8 h-8 object-cover rounded"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-48">
                        {product.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Only {product.stock} left
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`/admin/products/edit/${product._id}`}
                    className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium"
                  >
                    Restock
                  </Link>
                </div>
              ))}

              {lowStockProducts.length > 3 && (
                <p className="text-xs text-orange-600 dark:text-orange-400">
                  +{lowStockProducts.length - 3} more products need restocking
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <Link
                to="/admin/inventory"
                className="inline-flex items-center px-3 py-1.5 bg-orange-600 text-white text-xs font-medium rounded-lg hover:bg-orange-700 transition-colors"
              >
                Manage Inventory
              </Link>
              <Link
                to="/admin/products"
                className="inline-flex items-center px-3 py-1.5 bg-white dark:bg-gray-700 text-orange-600 dark:text-orange-400 text-xs font-medium rounded-lg border border-orange-200 dark:border-orange-800 hover:bg-orange-50 dark:hover:bg-orange-900/30 transition-colors"
              >
                View Products
              </Link>
            </div>
          </div>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="text-orange-400 hover:text-orange-600 dark:text-orange-500 dark:hover:text-orange-300 p-1"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
