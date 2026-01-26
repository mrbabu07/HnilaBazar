import { createContext, useState, useEffect } from "react";
import {
  getWishlist,
  addToWishlist as addToWishlistApi,
  removeFromWishlist as removeFromWishlistApi,
} from "../services/wishlistApi";
import useAuth from "../hooks/useAuth";
import { useToast } from "./ToastContext";

export const WishlistContext = createContext();

export default function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { success, error } = useToast();

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
      error("Please login to add items to wishlist", {
        title: "Login Required",
      });
      return false;
    }

    try {
      await addToWishlistApi(product._id);
      setWishlist((prev) => [...prev, product]);
      success(`${product.title} added to wishlist`, {
        title: "Added to Wishlist",
      });
      return true;
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
      if (error.response?.data?.error) {
        error(error.response.data.error, {
          title: "Failed to Add",
        });
      } else {
        error("Failed to add item to wishlist", {
          title: "Error",
        });
      }
      return false;
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const productToRemove = wishlist.find((item) => item._id === productId);
      await removeFromWishlistApi(productId);
      setWishlist((prev) => prev.filter((item) => item._id !== productId));

      if (productToRemove) {
        success(`${productToRemove.title} removed from wishlist`, {
          title: "Removed from Wishlist",
        });
      }
      return true;
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
      error("Failed to remove item from wishlist", {
        title: "Error",
      });
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
