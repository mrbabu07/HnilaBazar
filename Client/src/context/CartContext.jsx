import { createContext, useState, useEffect } from "react";
import { useToast } from "./ToastContext";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const { success, error } = useToast();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (
    product,
    quantity = 1,
    selectedImage = null,
    selectedSize = null,
    selectedColor = null,
  ) => {
    setCart((prev) => {
      const cartItem = {
        ...product,
        quantity,
        selectedImage:
          selectedImage ||
          product.image ||
          (product.images && product.images[0]),
        selectedSize: selectedSize || product.selectedSize,
        selectedColor: selectedColor || product.selectedColor,
        addedAt: Date.now(), // For unique identification if same product with different options
      };

      // Create unique key for cart item (product + size + color combination)
      const itemKey = `${product._id}_${selectedSize || "no-size"}_${selectedColor?.name || "no-color"}`;
      const existing = prev.find(
        (item) =>
          item._id === product._id &&
          (item.selectedSize || "no-size") === (selectedSize || "no-size") &&
          (item.selectedColor?.name || "no-color") ===
            (selectedColor?.name || "no-color"),
      );

      if (existing) {
        success(`Updated ${product.title} quantity in cart`, {
          title: "Cart Updated",
        });
        return prev.map((item) =>
          item._id === product._id &&
          (item.selectedSize || "no-size") === (selectedSize || "no-size") &&
          (item.selectedColor?.name || "no-color") ===
            (selectedColor?.name || "no-color")
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      success(`${product.title} added to cart`, {
        title: "Added to Cart",
      });
      return [...prev, cartItem];
    });
  };

  const removeFromCart = (
    productId,
    selectedSize = null,
    selectedColor = null,
  ) => {
    setCart((prev) => {
      const itemToRemove = prev.find(
        (item) =>
          item._id === productId &&
          (item.selectedSize || "no-size") ===
            (selectedSize || item.selectedSize || "no-size") &&
          (item.selectedColor?.name || "no-color") ===
            (selectedColor?.name || item.selectedColor?.name || "no-color"),
      );

      if (itemToRemove) {
        success(`${itemToRemove.title} removed from cart`, {
          title: "Removed from Cart",
        });
      }

      return prev.filter(
        (item) =>
          !(
            item._id === productId &&
            (item.selectedSize || "no-size") ===
              (selectedSize || item.selectedSize || "no-size") &&
            (item.selectedColor?.name || "no-color") ===
              (selectedColor?.name || item.selectedColor?.name || "no-color")
          ),
      );
    });
  };

  const updateQuantity = (
    productId,
    quantity,
    selectedSize = null,
    selectedColor = null,
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize, selectedColor);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item._id === productId &&
        (item.selectedSize || "no-size") ===
          (selectedSize || item.selectedSize || "no-size") &&
        (item.selectedColor?.name || "no-color") ===
          (selectedColor?.name || item.selectedColor?.name || "no-color")
          ? { ...item, quantity }
          : item,
      ),
    );
  };

  const clearCart = () => {
    setCart([]);
    success("Cart cleared successfully", {
      title: "Cart Cleared",
    });
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
