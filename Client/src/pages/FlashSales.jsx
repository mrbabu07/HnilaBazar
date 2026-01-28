import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Loading from "../components/Loading";
import useCart from "../hooks/useCart";
import { useToast } from "../context/ToastContext";

const FlashSales = () => {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const toast = useToast();
  const [activeFlashSales, setActiveFlashSales] = useState([]);
  const [upcomingFlashSales, setUpcomingFlashSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timers, setTimers] = useState({});

  useEffect(() => {
    fetchFlashSales();
  }, []);

  const fetchFlashSales = async () => {
    try {
      const [activeRes, upcomingRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/flash-sales/active`),
        fetch(`${import.meta.env.VITE_API_URL}/flash-sales/upcoming`),
      ]);

      if (activeRes.ok) {
        const activeData = await activeRes.json();
        setActiveFlashSales(Array.isArray(activeData) ? activeData : []);
      }

      if (upcomingRes.ok) {
        const upcomingData = await upcomingRes.json();
        setUpcomingFlashSales(Array.isArray(upcomingData) ? upcomingData : []);
      }
    } catch (error) {
      console.error("Error fetching flash sales:", error);
      toast.error("Failed to load flash sales");
      setActiveFlashSales([]);
      setUpcomingFlashSales([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimers = {};

      [...activeFlashSales, ...upcomingFlashSales].forEach((sale) => {
        const now = new Date().getTime();
        const targetTime =
          sale.status === "upcoming"
            ? new Date(sale.startTime).getTime()
            : new Date(sale.endTime).getTime();
        const distance = targetTime - now;

        if (distance < 0) {
          fetchFlashSales();
          return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        newTimers[sale._id] = { days, hours, minutes, seconds };
      });

      setTimers(newTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, [activeFlashSales, upcomingFlashSales]);

  const handleAddToCart = async (sale) => {
    try {
      await addToCart(sale.product._id, 1);
      toast.success("Added to cart!");
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  const FlashSaleCard = ({ sale, isUpcoming = false }) => {
    const timer = timers[sale._id] || {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    const stockPercentage =
      ((sale.totalStock - sale.soldCount) / sale.totalStock) * 100;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border-2 border-red-500 relative">
        {!isUpcoming && (
          <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold z-10 animate-pulse">
            ⚡ LIVE
          </div>
        )}

        <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold z-10">
          -{sale.discountPercentage}%
        </div>

        <Link to={`/products/${sale.product._id}`}>
          <img
            src={sale.product.images?.[0] || "/placeholder.jpg"}
            alt={sale.product.name}
            className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
          />
        </Link>

        <div className="p-4">
          <Link to={`/products/${sale.product._id}`}>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white hover:text-red-600 transition">
              {sale.title}
            </h3>
          </Link>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
            {sale.description || sale.product.description}
          </p>

          <div className="mt-3 flex items-center gap-3">
            <span className="text-2xl font-bold text-red-600">
              ₹{sale.flashPrice.toFixed(2)}
            </span>
            <span className="text-lg text-gray-500 line-through">
              ₹{sale.originalPrice.toFixed(2)}
            </span>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>
                {isUpcoming
                  ? t("flashSale.startsIn", "Starts in")
                  : t("flashSale.endsIn", "Ends in")}
                :
              </span>
              <span className="font-bold text-red-600">
                {timer.days > 0 && `${timer.days}d `}
                {String(timer.hours).padStart(2, "0")}:
                {String(timer.minutes).padStart(2, "0")}:
                {String(timer.seconds).padStart(2, "0")}
              </span>
            </div>

            {!isUpcoming && (
              <>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <span>
                    {t("flashSale.sold", "Sold")}: {sale.soldCount}
                  </span>
                  <span>
                    {sale.remainingStock} {t("flashSale.left", "left")}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-red-600 to-orange-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${100 - stockPercentage}%` }}
                  />
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => handleAddToCart(sale)}
            disabled={isUpcoming || sale.remainingStock === 0}
            className={`w-full mt-4 py-3 rounded-lg font-bold transition ${
              isUpcoming || sale.remainingStock === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-red-600 to-orange-600 text-white hover:from-red-700 hover:to-orange-700"
            }`}
          >
            {isUpcoming
              ? t("flashSale.comingSoon", "Coming Soon")
              : sale.remainingStock === 0
                ? t("flashSale.soldOut", "Sold Out")
                : t("flashSale.buyNow", "Buy Now")}
          </button>
        </div>
      </div>
    );
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            ⚡ {t("flashSale.title", "Flash Sales")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t("flashSale.subtitle", "Limited time deals with huge discounts!")}
          </p>
        </div>

        {activeFlashSales.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></span>
              {t("flashSale.activeNow", "Active Now")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeFlashSales.map((sale) => (
                <FlashSaleCard key={sale._id} sale={sale} />
              ))}
            </div>
          </div>
        )}

        {upcomingFlashSales.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t("flashSale.upcoming", "Coming Soon")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingFlashSales.map((sale) => (
                <FlashSaleCard key={sale._id} sale={sale} isUpcoming />
              ))}
            </div>
          </div>
        )}

        {activeFlashSales.length === 0 && upcomingFlashSales.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t("flashSale.noSales", "No flash sales available at the moment")}
            </p>
            <Link
              to="/products"
              className="inline-block mt-4 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              {t("flashSale.browseProducts", "Browse All Products")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashSales;
