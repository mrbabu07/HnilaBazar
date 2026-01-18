import { createContext, useState, useEffect } from "react";
import {
  getWishlist,
  addToWishlist as addToWishlistApi,
  removeFromWishlist as removeFromWishlistApi,
} from "../services/wishlistApi";
import useAuth from "../hooks/useAuth";

export const WishlistContext = createContext();

export default function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setWishlist([]);
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await getWishlist();
      setWishlist(response.data.data.productDetails || []);
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (product) => {
    if (!user) {
      alert("Please login to add items to wishlist");
      return false;
    }

    try {
      await addToWishlistApi(product._id);
      setWishlist((prev) => [...prev, product]);
      return true;
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      }
      return false;
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await removeFromWishlistApi(productId);
      setWishlist((prev) => prev.filter((item) => item._id !== productId));
      return true;
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
      return false;
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item._id === productId);
  };

  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        wishlistCount,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
