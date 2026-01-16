import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CategoryPage from "../pages/CategoryPage";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
import Profile from "../pages/Profile";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminCategories from "../pages/admin/AdminCategories";
import AdminOrders from "../pages/admin/AdminOrders";
import ProductForm from "../pages/admin/ProductForm";
import PrivateRoute from "../components/PrivateRoute";
import AdminRoute from "../components/AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/mens", element: <CategoryPage /> },
      { path: "/womens", element: <CategoryPage /> },
      { path: "/electronics", element: <CategoryPage /> },
      { path: "/baby", element: <CategoryPage /> },
      { path: "/product/:id", element: <ProductDetail /> },
      { path: "/cart", element: <Cart /> },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/products",
        element: (
          <AdminRoute>
            <AdminProducts />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/products/add",
        element: (
          <AdminRoute>
            <ProductForm />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/products/edit/:id",
        element: (
          <AdminRoute>
            <ProductForm />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/categories",
        element: (
          <AdminRoute>
            <AdminCategories />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/orders",
        element: (
          <AdminRoute>
            <AdminOrders />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
