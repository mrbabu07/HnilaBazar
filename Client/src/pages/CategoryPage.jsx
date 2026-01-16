import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";

export default function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getProducts(category);
      setProducts(response.data.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const categoryNames = {
    mens: "Men's",
    womens: "Women's",
    electronics: "Electronics",
    baby: "Baby",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8">
        {categoryNames[category] || "Products"}
      </h1>

      {loading ? (
        <Loading />
      ) : products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600">
            No products found in this category
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
