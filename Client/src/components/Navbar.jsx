import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";
import { getCategories } from "../services/api";
import ThemeToggle from "./ThemeToggle";
import NotificationBell from "./NotificationBell";

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    fetchCategories();
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Products", path: "/products" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 dark:from-primary-700 dark:to-secondary-700 text-white text-sm shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2 font-medium">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                +880 1XXX-XXXXXX
              </span>
              <span className="hidden sm:flex items-center gap-2 font-medium">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                support@hnilabazar.com
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
              </svg>
              Free Delivery on Orders Over $100
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`bg-white/95 dark:bg-gray-900/95 backdrop-blur-md sticky top-0 z-50 border-b dark:border-gray-800 transition-all duration-300 ${scrolled ? 'shadow-lg' : 'shadow-md'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-11 h-11 bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 bg-clip-text text-transparent">
                  HnilaBazar
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1 font-medium">
                  Your Shopping Destination
                </p>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearch} className="w-full relative group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-4 py-2.5 pl-12 pr-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white dark:focus:bg-gray-800 transition-all duration-200"
                />
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 group-focus-within:text-primary-500 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </form>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/30 dark:to-secondary-900/30 text-primary-600 dark:text-primary-400 shadow-sm"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              {/* Categories Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  Categories
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${categoriesOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {categoriesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 py-2 z-50 animate-fade-in">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                        </svg>
                        Shop by Category
                      </p>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {categories.length > 0 ? (
                        categories.map((category) => (
                          <Link
                            key={category._id}
                            to={`/category/${category.slug}`}
                            onClick={() => setCategoriesOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 dark:hover:from-primary-900/20 dark:hover:to-secondary-900/20 transition-all duration-200 group"
                          >
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                              <span className="text-lg">📦</span>
                            </div>
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                              {category.name}
                            </span>
                            <svg className="w-4 h-4 ml-auto text-gray-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        ))
                      ) : (
                        <div className="px-4 py-6 text-center">
                          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-2">
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">No categories available</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Notification Bell */}
              {user && <NotificationBell />}

              {/* Wishlist */}
              {user && (
                <Link
                  to="/wishlist"
                  className="relative p-2.5 rounded-xl hover:bg-gradient-to-br hover:from-red-50 hover:to-pink-50 dark:hover:from-red-900/20 dark:hover:to-pink-900/20 transition-all duration-200 group"
                >
                  <svg
                    className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-red-500 group-hover:scale-110 transition-all duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg ring-2 ring-white dark:ring-gray-900">
                      {wishlistCount > 9 ? "9+" : wishlistCount}
                    </span>
                  )}
                </Link>
              )}

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2.5 rounded-xl hover:bg-gradient-to-br hover:from-primary-50 hover:to-secondary-50 dark:hover:from-primary-900/20 dark:hover:to-secondary-900/20 transition-all duration-200 group"
              >
                <svg
                  className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-primary-600 group-hover:scale-110 transition-all duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg ring-2 ring-white dark:ring-gray-900">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              {user ? (
                <div className="hidden md:flex items-center space-x-2">
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="px-4 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white text-sm font-semibold rounded-xl hover:from-secondary-600 hover:to-secondary-700 hover:shadow-lg hover:scale-105 transition-all duration-200 shadow-md"
                    >
                      Admin
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 hover:opacity-80 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-400 via-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-200 ring-2 ring-white dark:ring-gray-900">
                      <span className="text-white text-sm font-bold">
                        {user.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </Link>
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-semibold rounded-xl hover:from-primary-600 hover:to-secondary-600 hover:shadow-lg hover:scale-105 transition-all duration-200 shadow-md"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              >
                <svg
                  className="w-6 h-6 text-gray-700 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch} className="relative group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2.5 pl-12 pr-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white dark:focus:bg-gray-800 transition-all duration-200"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 group-focus-within:text-primary-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </form>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100 dark:border-gray-800 animate-fade-in">
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/30 dark:to-secondary-900/30 text-primary-600 dark:text-primary-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}

                {/* Mobile Categories */}
                <div className="px-4 py-3 mt-2">
                  <p className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                    </svg>
                    Categories
                  </p>
                  <div className="space-y-1 ml-2">
                    {categories.map((category) => (
                      <Link
                        key={category._id}
                        to={`/category/${category.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 py-2 px-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all duration-200"
                      >
                        <span className="text-base">📦</span>
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Mobile User Menu */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 mt-4 space-y-1">
                  {user ? (
                    <>
                      <Link
                        to="/profile"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
                      >
                        My Orders
                      </Link>
                      <Link
                        to="/addresses"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
                      >
                        My Addresses
                      </Link>
                      <Link
                        to="/returns"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
                      >
                        Returns & Refunds
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-4 py-3 text-sm font-semibold text-secondary-600 dark:text-secondary-400 hover:bg-secondary-50 dark:hover:bg-secondary-900/20 rounded-xl transition-all duration-200"
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-3 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-3 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-xl transition-all duration-200"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Close dropdown when clicking outside */}
      {categoriesOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setCategoriesOpen(false)}
        />
      )}
    </>
  );
}