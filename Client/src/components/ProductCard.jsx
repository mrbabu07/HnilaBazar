import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link to={`/product/${product._id}`} className="card overflow-hidden group">
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {product.title}
        </h3>

        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-primary">
            ${product.price}
          </span>
          {product.stock > 0 ? (
            <span className="text-sm text-green-600">In Stock</span>
          ) : (
            <span className="text-sm text-red-600">Out of Stock</span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full btn-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
}
