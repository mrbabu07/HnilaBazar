import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CategoryPage from "../pages/CategoryPage";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Compare from "../pages/Compare";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
import Profile from "../pages/Profile";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminCategories from "../pages/admin/AdminCategories";
import AdminOrders from "../pages/admin/AdminOrders";
import ProductForm from "../pages/admin/ProductForm";
import AdminCoupons from "../pages/admin/AdminCoupons";
import AdminReturns from "../pages/admin/AdminReturns";
import AdminOffers from "../pages/admin/AdminOffers";
import AdminReviews from "../pages/admin/AdminReviews";
import OfferForm from "../pages/admin/OfferForm";
import Returns from "../pages/Returns";
import Addresses from "../pages/Addresses";
import PrivateRoute from "../components/PrivateRoute";
import AdminRoute from "../components/AdminRoute";
import SearchResults from "../pages/SearchResults";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/category/:category", element: <CategoryPage /> },
      { path: "/categories", element: <CategoryPage /> },
      { path: "/products", element: <Products /> },
      { path: "/search", element: <SearchResults /> },

      // Legacy routes for backward compatibility
      { path: "/mens", element: <CategoryPage /> },
      { path: "/womens", element: <CategoryPage /> },
      { path: "/electronics", element: <CategoryPage /> },
      { path: "/baby", element: <CategoryPage /> },
      { path: "/product/:id", element: <ProductDetail /> },
      { path: "/cart", element: <Cart /> },
      { path: "/compare", element: <Compare /> },
      {
        path: "/wishlist",
        element: (
          <PrivateRoute>
            <Wishlist />
          </PrivateRoute>
        ),
      },
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
      {
        path: "/admin/coupons",
        element: (
          <AdminRoute>
            <AdminCoupons />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/returns",
        element: (
          <AdminRoute>
            <AdminReturns />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/offers",
        element: (
          <AdminRoute>
            <AdminOffers />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/offers/add",
        element: (
          <AdminRoute>
            <OfferForm />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/offers/edit/:id",
        element: (
          <AdminRoute>
            <OfferForm />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/reviews",
        element: (
          <AdminRoute>
            <AdminReviews />
          </AdminRoute>
        ),
      },
      {
        path: "/returns",
        element: (
          <PrivateRoute>
            <Returns />
          </PrivateRoute>
        ),
      },
      {
        path: "/addresses",
        element: (
          <PrivateRoute>
            <Addresses />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
