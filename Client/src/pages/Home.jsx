import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data.data.slice(0, 8));
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Welcome to HnilaBazar</h1>
            <p className="text-xl mb-8">
              Discover amazing products at unbeatable prices
            </p>
            <Link
              to="/mens"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              name: "Men's",
              slug: "mens",
              img: "https://via.placeholder.com/300x200?text=Mens",
            },
            {
              name: "Women's",
              slug: "womens",
              img: "https://via.placeholder.com/300x200?text=Womens",
            },
            {
              name: "Electronics",
              slug: "electronics",
              img: "https://via.placeholder.com/300x200?text=Electronics",
            },
            {
              name: "Baby",
              slug: "baby",
              img: "https://via.placeholder.com/300x200?text=Baby",
            },
          ].map((category) => (
            <Link
              key={category.slug}
              to={`/${category.slug}`}
              className="card overflow-hidden group"
            >
              <img
                src={category.img}
                alt={category.name}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Featured Products
        </h2>
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Promo Section */}
      <section className="bg-accent py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Special Offer!</h2>
          <p className="text-xl mb-6">Get 20% off on your first order</p>
          <Link
            to="/register"
            className="bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition inline-block"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
}
