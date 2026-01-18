import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./context/AuthContext";
import CartProvider from "./context/CartContext";
import WishlistProvider from "./context/WishlistContext";
import { ThemeProvider } from "./context/ThemeContext";
import { NotificationProvider } from "./context/NotificationContext";
import router from "./routes/Routes";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <CartProvider>
            <WishlistProvider>
              <RouterProvider router={router} />
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: "white",
                    color: "#374151",
                    fontWeight: "600",
                    borderRadius: "12px",
                    padding: "16px 20px",
                    boxShadow:
                      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    border: "1px solid #E5E7EB",
                  },
                }}
              />
            </WishlistProvider>
          </CartProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
