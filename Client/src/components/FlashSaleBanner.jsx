import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FlashSaleBanner = () => {
  const { t } = useTranslation();
  const [flashSales, setFlashSales] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    fetchActiveFlashSales();
  }, []);

  const fetchActiveFlashSales = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/flash-sales/active`,
      );
      console.log("Flash Sales API Response Status:", response.status);

      if (!response.ok) {
        console.error("Flash Sales API Error:", response.statusText);
        return;
      }

      const data = await response.json();
      console.log("Flash Sales Data:", data);
      setFlashSales(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching flash sales:", error);
    }
  };

  useEffect(() => {
    if (flashSales.length === 0) return;

    const timer = setInterval(() => {
      const sale = flashSales[currentIndex];
      if (!sale) return;

      const now = new Date().getTime();
      const end = new Date(sale.endTime).getTime();
      const distance = end - now;

      if (distance < 0) {
        fetchActiveFlashSales();
        return;
      }

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [flashSales, currentIndex]);

  useEffect(() => {
    if (flashSales.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % flashSales.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [flashSales.length]);

  if (flashSales.length === 0) return null;

  const currentSale = flashSales[currentIndex];
  if (!currentSale) return null;

  const stockPercentage =
    ((currentSale.totalStock - currentSale.soldCount) /
      currentSale.totalStock) *
    100;
  100;

  return (
    <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 px-6 rounded-lg shadow-lg mb-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-white text-red-600 px-3 py-1 rounded-full font-bold text-sm animate-pulse">
              ⚡ {t("flashSale.title", "FLASH SALE")}
            </div>
            <h3 className="text-xl font-bold">{currentSale.title}</h3>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex gap-2">
              <div className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded text-center min-w-[60px]">
                <div className="text-2xl font-bold">
                  {String(timeLeft.hours || 0).padStart(2, "0")}
                </div>
                <div className="text-xs opacity-80">
                  {t("flashSale.hours", "Hours")}
                </div>
              </div>
              <div className="text-2xl font-bold">:</div>
              <div className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded text-center min-w-[60px]">
                <div className="text-2xl font-bold">
                  {String(timeLeft.minutes || 0).padStart(2, "0")}
                </div>
                <div className="text-xs opacity-80">
                  {t("flashSale.minutes", "Mins")}
                </div>
              </div>
              <div className="text-2xl font-bold">:</div>
              <div className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded text-center min-w-[60px]">
                <div className="text-2xl font-bold">
                  {String(timeLeft.seconds || 0).padStart(2, "0")}
                </div>
                <div className="text-xs opacity-80">
                  {t("flashSale.seconds", "Secs")}
                </div>
              </div>
            </div>

            <Link
              to="/flash-sales"
              className="bg-white text-red-600 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition"
            >
              {t("flashSale.shopNow", "Shop Now")} →
            </Link>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span>
                {t("flashSale.sold", "Sold")}: {currentSale.soldCount}/
                {currentSale.totalStock}
              </span>
              <span>
                {stockPercentage.toFixed(0)}%{" "}
                {t("flashSale.remaining", "Remaining")}
              </span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-500"
                style={{ width: `${100 - stockPercentage}%` }}
              />
            </div>
          </div>

          {flashSales.length > 1 && (
            <div className="flex gap-1">
              {flashSales.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition ${
                    idx === currentIndex ? "bg-white w-6" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlashSaleBanner;
