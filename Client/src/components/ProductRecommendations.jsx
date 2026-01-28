import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { ProductCardSkeleton } from "./Skeleton";

const ProductRecommendations = ({
  productId,
  type = "similar",
  title,
  limit = 6,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendations();
  }, [productId, type]);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      let url = "";

      switch (type) {
        case "similar":
          url = `${import.meta.env.VITE_API_URL}/recommendations/similar/${productId}?limit=${limit}`;
          break;
        case "also-viewed":
          url = `${import.meta.env.VITE_API_URL}/recommendations/also-viewed/${productId}?limit=${limit}`;
          break;
        case "bought-together":
          url = `${import.meta.env.VITE_API_URL}/recommendations/bought-together/${productId}?limit=${limit}`;
          break;
        case "trending":
          url = `${import.meta.env.VITE_API_URL}/recommendations/trending?limit=${limit}`;
          break;
        default:
          url = `${import.meta.env.VITE_API_URL}/recommendations/similar/${productId}?limit=${limit}`;
      }

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setProducts(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {title}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: limit }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductRecommendations;
