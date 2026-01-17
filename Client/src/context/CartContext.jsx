import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (
    product,
    quantity = 1,
    selectedImage = null,
    selectedSize = null,
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
        addedAt: Date.now(), // For unique identification if same product with different options
      };

      // Create unique key for cart item (product + size combination)
      const itemKey = `${product._id}_${selectedSize || "no-size"}`;
      const existing = prev.find(
        (item) =>
          item._id === product._id &&
          (item.selectedSize || "no-size") === (selectedSize || "no-size"),
      );

      if (existing) {
        return prev.map((item) =>
          item._id === product._id &&
          (item.selectedSize || "no-size") === (selectedSize || "no-size")
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, cartItem];
    });
  };

  const removeFromCart = (productId, selectedSize = null) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item._id === productId &&
            (item.selectedSize || "no-size") ===
              (selectedSize || item.selectedSize || "no-size")
          ),
      ),
    );
  };

  const updateQuantity = (productId, quantity, selectedSize = null) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item._id === productId &&
        (item.selectedSize || "no-size") ===
          (selectedSize || item.selectedSize || "no-size")
          ? { ...item, quantity }
          : item,
      ),
    );
  };

  const clearCart = () => {
    setCart([]);
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
