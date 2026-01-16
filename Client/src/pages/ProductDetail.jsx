import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/api";
import useCart from "../hooks/useCart";
import Loading from "../components/Loading";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await getProductById(id);
      setProduct(response.data.data);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate("/cart");
  };

  if (loading) return <Loading />;
  if (!product)
    return <div className="text-center py-16">Product not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={product.image || "https://via.placeholder.com/600"}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-3xl font-bold text-primary mb-6">
            ${product.price}
          </p>

          <div className="mb-6">
            {product.stock > 0 ? (
              <span className="text-green-600 font-semibold">
                In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-red-600 font-semibold">Out of Stock</span>
            )}
          </div>

          <p className="text-gray-700 mb-8">
            {product.description || "No description available"}
          </p>

          <div className="flex items-center space-x-4 mb-6">
            <label className="font-semibold">Quantity:</label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-6 py-2 border-x border-gray-300">
                {quantity}
              </span>
              <button
                onClick={() =>
                  setQuantity(Math.min(product.stock, quantity + 1))
                }
                className="px-4 py-2 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="btn-primary w-full md:w-auto disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
