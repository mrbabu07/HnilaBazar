# HnilaBazar - Project Folder Structure

This document describes the complete folder structure of the HnilaBazar e-commerce platform.

## 📁 Root Directory

```
HnilaBazar/
├── Client/                 # Frontend React application
├── Server/                 # Backend Node.js/Express API
├── README.md              # Main project documentation
└── seed-database.bat      # Database seeding script (Windows)
```

---

## 🎨 Client (Frontend)

```
Client/
├── public/                # Static assets
│   ├── icons/            # PWA icons
│   ├── generate-icons.html
│   ├── icon-generator.html
│   ├── manifest.json     # PWA manifest
│   ├── offline.html      # Offline fallback page
│   ├── sw.js            # Service worker
│   └── vite.svg
│
├── src/                  # Source code
│   ├── assets/          # Images, fonts, etc.
│   │   └── react.svg
│   │
│   ├── components/      # Reusable React components
│   │   ├── admin/      # Admin-specific components
│   │   │   ├── AnalyticsChart.jsx
│   │   │   ├── InventoryImportExport.jsx
│   │   │   ├── LowStockAlert.jsx
│   │   │   ├── MetricCard.jsx
│   │   │   ├── RealtimeStats.jsx
│   │   │   ├── StockMovementTracker.jsx
│   │   │   └── TopProducts.jsx
│   │   │
│   │   ├── reviews/    # Review system components
│   │   │   ├── ProductRating.jsx
│   │   │   ├── ReviewCard.jsx
│   │   │   ├── ReviewForm.jsx
│   │   │   ├── ReviewsSection.jsx
│   │   │   └── StarRating.jsx
│   │   │
│   │   ├── AdminRoute.jsx
│   │   ├── AutoSlideshow.jsx
│   │   ├── BackButton.jsx
│   │   ├── Badge.jsx
│   │   ├── Button.jsx
│   │   ├── CategoryScroller.jsx
│   │   ├── CompareButton.jsx
│   │   ├── ComparisonFloatingButton.jsx
│   │   ├── CouponInput.jsx
│   │   ├── EmptyState.jsx
│   │   ├── FlashSaleBanner.jsx
│   │   ├── Footer.jsx
│   │   ├── Input.jsx
│   │   ├── LanguageSwitcher.jsx
│   │   ├── Loading.jsx
│   │   ├── Modal.jsx
│   │   ├── Navbar.jsx
│   │   ├── NotificationBell.jsx
│   │   ├── OfferPopup.jsx
│   │   ├── PageHeader.jsx
│   │   ├── PrivateRoute.jsx
│   │   ├── ProductBadge.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductFilters.jsx
│   │   ├── ProductRecommendations.jsx
│   │   ├── PWAStatus.jsx
│   │   ├── QuickViewModal.jsx
│   │   ├── RecentlyViewed.jsx
│   │   ├── ScrollToTop.jsx
│   │   ├── SearchBar.jsx
│   │   ├── SimpleButton.jsx
│   │   ├── SimpleLanguageSwitcher.jsx
│   │   ├── SimpleModal.jsx
│   │   ├── SizeGuide.jsx
│   │   ├── Skeleton.jsx
│   │   ├── SocialProofIndicators.jsx
│   │   ├── SocialShare.jsx
│   │   ├── SortDropdown.jsx
│   │   ├── StarRating.jsx
│   │   ├── StockAlertButton.jsx
│   │   ├── StockIndicator.jsx
│   │   ├── TawkToChat.jsx
│   │   ├── ThemeToggle.jsx
│   │   ├── Toast.jsx
│   │   ├── TopBarLanguageSwitcher.jsx
│   │   └── WishlistButton.jsx
│   │
│   ├── context/         # React Context providers
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   ├── ComparisonContext.jsx
│   │   ├── NotificationContext.jsx
│   │   ├── ThemeContext.jsx
│   │   ├── ToastContext.jsx
│   │   └── WishlistContext.jsx
│   │
│   ├── firebase/        # Firebase configuration
│   │   └── firebase.config.js
│   │
│   ├── hooks/          # Custom React hooks
│   │   ├── useAuth.jsx
│   │   ├── useCart.jsx
│   │   ├── useClickOutside.jsx
│   │   ├── useDebounce.jsx
│   │   ├── useLocalStorage.jsx
│   │   ├── useRecentlyViewed.jsx
│   │   ├── useSorting.jsx
│   │   └── useWishlist.jsx
│   │
│   ├── i18n/           # Internationalization
│   │   ├── locales/
│   │   │   ├── bn.json    # Bengali translations
│   │   │   ├── en.json    # English translations
│   │   │   └── hi.json    # Hindi translations
│   │   ├── i18n.js
│   │   └── README.md
│   │
│   ├── layouts/        # Layout components
│   │   └── MainLayout.jsx
│   │
│   ├── pages/          # Page components
│   │   ├── admin/     # Admin pages
│   │   │   ├── AdminCategories.jsx
│   │   │   ├── AdminCoupons.jsx
│   │   │   ├── AdminCustomerInsights.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminFlashSales.jsx
│   │   │   ├── AdminInventory.jsx
│   │   │   ├── AdminOffers.jsx
│   │   │   ├── AdminOrders.jsx
│   │   │   ├── AdminProducts.jsx
│   │   │   ├── AdminReturns.jsx
│   │   │   ├── AdminReviews.jsx
│   │   │   ├── AdminSupport.jsx
│   │   │   ├── AdminUserManagement.jsx
│   │   │   ├── OfferForm.jsx
│   │   │   └── ProductForm.jsx
│   │   │
│   │   ├── About.jsx
│   │   ├── Addresses.jsx
│   │   ├── Cart.jsx
│   │   ├── CategoryPage.jsx
│   │   ├── Checkout.jsx
│   │   ├── Compare.jsx
│   │   ├── Contact.jsx
│   │   ├── FlashSales.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── LoyaltyDashboard.jsx
│   │   ├── MyAlerts.jsx
│   │   ├── Orders.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Products.jsx
│   │   ├── Profile.jsx
│   │   ├── Register.jsx
│   │   ├── Returns.jsx
│   │   ├── SearchResults.jsx
│   │   ├── Support.jsx
│   │   └── Wishlist.jsx
│   │
│   ├── routes/         # Route configuration
│   │   └── Routes.jsx
│   │
│   ├── services/       # API service layer
│   │   ├── api.js
│   │   ├── imageUpload.js
│   │   ├── notifications.js
│   │   ├── reviewApi.js
│   │   └── wishlistApi.js
│   │
│   ├── utils/          # Utility functions
│   │   ├── auth.js
│   │   └── pwa.js
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .env.example        # Environment variables template
├── .env.local          # Local environment variables (gitignored)
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js
```

---

## ⚙️ Server (Backend)

```
Server/
├── config/             # Configuration files (future use)
│   └── .gitkeep
│
├── controllers/        # Request handlers
│   ├── addressController.js
│   ├── categoryController.js
│   ├── couponController.js
│   ├── flashSaleController.js
│   ├── loyaltyController.js
│   ├── offerController.js
│   ├── orderController.js
│   ├── paymentController.js
│   ├── productController.js
│   ├── recommendationController.js
│   ├── returnController.js
│   ├── reviewController.js
│   ├── stockAlertController.js
│   ├── supportController.js
│   ├── userController.js
│   ├── userManagementController.js
│   └── wishlistController.js
│
├── middleware/         # Express middleware
│   └── auth.js        # Authentication & authorization
│
├── models/            # Database models
│   ├── Address.js
│   ├── Category.js
│   ├── Coupon.js
│   ├── CustomerInsight.js
│   ├── FlashSale.js
│   ├── LiveChat.js
│   ├── Loyalty.js
│   ├── Offer.js
│   ├── Order.js
│   ├── Payment.js
│   ├── Product.js
│   ├── Recommendation.js
│   ├── Return.js
│   ├── Review.js
│   ├── StockAlert.js
│   ├── SupportTicket.js
│   ├── User.js
│   └── Wishlist.js
│
├── routes/            # API route definitions
│   ├── addressRoutes.js
│   ├── categoryRoutes.js
│   ├── couponRoutes.js
│   ├── flashSaleRoutes.js
│   ├── loyaltyRoutes.js
│   ├── offerRoutes.js
│   ├── orderRoutes.js
│   ├── paymentRoutes.js
│   ├── productRoutes.js
│   ├── recommendationRoutes.js
│   ├── returnRoutes.js
│   ├── reviewRoutes.js
│   ├── stockAlertRoutes.js
│   ├── supportRoutes.js
│   ├── userManagementRoutes.js
│   ├── userRoutes.js
│   └── wishlistRoutes.js
│
├── scripts/           # Utility scripts
│   ├── checkFlashSales.js      # Check flash sale status
│   ├── makeAdmin.js            # Make user admin
│   ├── seed.js                 # Seed basic data
│   ├── seedAll.js              # Seed all features
│   ├── seedFlashSales.js       # Seed flash sales
│   ├── test-server.js          # Test server
│   ├── testAllAPIs.js          # Test all endpoints
│   └── testFlashSalesAPI.js    # Test flash sales API
│
├── services/          # Business logic layer
│   ├── emailService.js
│   ├── loyaltyService.js
│   ├── recommendationService.js
│   └── stockAlertService.js
│
├── uploads/           # Uploaded files (images, etc.)
│   └── .gitkeep
│
├── .env               # Environment variables (gitignored)
├── .env.example       # Environment variables template
├── .gitignore
├── index.js           # Main server file
├── package.json
└── package-lock.json
```

---

## 📝 Key Directories Explained

### Client Structure

- **`public/`**: Static assets served directly (PWA files, icons, manifest)
- **`src/components/`**: Reusable UI components organized by feature
- **`src/context/`**: Global state management using React Context API
- **`src/hooks/`**: Custom React hooks for reusable logic
- **`src/i18n/`**: Multi-language support (English, Bengali, Hindi)
- **`src/pages/`**: Page-level components (routes)
- **`src/services/`**: API communication layer
- **`src/utils/`**: Helper functions and utilities

### Server Structure

- **`config/`**: Configuration files (database, app settings) - reserved for future use
- **`controllers/`**: Handle HTTP requests and responses
- **`middleware/`**: Express middleware (auth, validation, error handling)
- **`models/`**: Database schemas and models (MongoDB/Mongoose)
- **`routes/`**: API endpoint definitions
- **`scripts/`**: Utility scripts for seeding, testing, and maintenance
- **`services/`**: Business logic and external service integrations
- **`uploads/`**: User-uploaded files (product images, etc.)

---

## 🚀 NPM Scripts

### Server Scripts

```bash
npm start              # Start production server
npm run dev            # Start development server with nodemon
npm run seed           # Seed basic data (products, categories)
npm run seed:all       # Seed all features (flash sales, loyalty, etc.)
npm run seed:flash     # Seed flash sales only
npm run check:flash    # Check flash sale status
npm run test:flash     # Test flash sales API
npm run test:all       # Test all API endpoints
npm run test:server    # Run test server
npm run make:admin     # Make a user admin (requires email)
```

### Client Scripts

```bash
npm run dev            # Start development server
npm run build          # Build for production
npm run lint           # Run ESLint
npm run preview        # Preview production build
```

---

## 🔧 Configuration Files

### Environment Variables

**Server (.env)**

- `MONGO_URI`: MongoDB connection string
- `PORT`: Server port (default: 5000)
- `FIREBASE_*`: Firebase Admin SDK credentials
- `EMAIL_*`: Email service configuration

**Client (.env.local)**

- `VITE_API_URL`: Backend API URL
- `VITE_FIREBASE_*`: Firebase client configuration

### Build Configuration

- **`vite.config.js`**: Vite build configuration
- **`tailwind.config.js`**: Tailwind CSS configuration
- **`postcss.config.js`**: PostCSS configuration
- **`eslint.config.js`**: ESLint rules

---

## 📦 Key Features by Folder

### Customer Features

- **Shopping**: `pages/Products.jsx`, `pages/ProductDetail.jsx`, `pages/Cart.jsx`
- **Checkout**: `pages/Checkout.jsx`, `pages/Orders.jsx`
- **Wishlist**: `pages/Wishlist.jsx`, `context/WishlistContext.jsx`
- **Flash Sales**: `pages/FlashSales.jsx`, `components/FlashSaleBanner.jsx`
- **Loyalty Program**: `pages/LoyaltyDashboard.jsx`
- **Stock Alerts**: `pages/MyAlerts.jsx`, `components/StockAlertButton.jsx`
- **Reviews**: `components/reviews/*`
- **Support**: `pages/Support.jsx`

### Admin Features

- **Dashboard**: `pages/admin/AdminDashboard.jsx`
- **Products**: `pages/admin/AdminProducts.jsx`, `pages/admin/ProductForm.jsx`
- **Orders**: `pages/admin/AdminOrders.jsx`
- **Flash Sales**: `pages/admin/AdminFlashSales.jsx`
- **Inventory**: `pages/admin/AdminInventory.jsx`
- **Users**: `pages/admin/AdminUserManagement.jsx`
- **Analytics**: `components/admin/AnalyticsChart.jsx`

---

## 🎯 Best Practices

1. **Component Organization**: Components are grouped by feature/domain
2. **Separation of Concerns**: Business logic in services, UI in components
3. **Reusability**: Common components in `components/`, page-specific in `pages/`
4. **Type Safety**: Consistent prop types and validation
5. **Code Splitting**: Lazy loading for better performance
6. **Environment Variables**: Sensitive data in `.env` files (gitignored)
7. **Scripts Organization**: All utility scripts in `scripts/` folder

---

## 📚 Additional Documentation

- **Main README**: `/README.md` - Complete project documentation
- **i18n README**: `/Client/src/i18n/README.md` - Translation guide
- **Client README**: `/Client/README.md` - Frontend-specific docs

---

**Last Updated**: January 2026
**Project**: HnilaBazar E-commerce Platform
**Version**: 1.0.0
