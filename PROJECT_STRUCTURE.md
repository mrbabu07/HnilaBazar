# 📂 HnilaBazar - Complete Project Structure

## Directory Overview

```
HnilaBazar/
├── Client/                          # Frontend React Application
│   ├── public/                      # Static assets
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/                  # Images, icons
│   │   │   └── react.svg
│   │   ├── components/              # Reusable UI components
│   │   │   ├── AdminRoute.jsx       # Admin-only route protection
│   │   │   ├── Footer.jsx           # Site footer
│   │   │   ├── Loading.jsx          # Loading spinner
│   │   │   ├── Navbar.jsx           # Navigation bar with cart
│   │   │   ├── PrivateRoute.jsx     # User authentication protection
│   │   │   └── ProductCard.jsx      # Product display card
│   │   ├── context/                 # React Context providers
│   │   │   ├── AuthContext.jsx      # Authentication state
│   │   │   └── CartContext.jsx      # Shopping cart state
│   │   ├── firebase/                # Firebase configuration
│   │   │   └── firebase.config.js   # Firebase initialization
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── useAuth.jsx          # Authentication hook
│   │   │   └── useCart.jsx          # Cart management hook
│   │   ├── layouts/                 # Page layouts
│   │   │   └── MainLayout.jsx       # Main app layout with nav/footer
│   │   ├── pages/                   # Page components
│   │   │   ├── admin/               # Admin pages
│   │   │   │   ├── AdminCategories.jsx  # Category management
│   │   │   │   ├── AdminDashboard.jsx   # Admin home
│   │   │   │   ├── AdminOrders.jsx      # Order management
│   │   │   │   ├── AdminProducts.jsx    # Product list management
│   │   │   │   └── ProductForm.jsx      # Add/Edit product form
│   │   │   ├── Cart.jsx             # Shopping cart page
│   │   │   ├── CategoryPage.jsx     # Category product listing
│   │   │   ├── Checkout.jsx         # Checkout process
│   │   │   ├── Home.jsx             # Homepage
│   │   │   ├── Login.jsx            # Login page
│   │   │   ├── Orders.jsx           # User order history
│   │   │   ├── ProductDetail.jsx    # Single product view
│   │   │   ├── Profile.jsx          # User profile
│   │   │   └── Register.jsx         # Registration page
│   │   ├── routes/                  # Routing configuration
│   │   │   └── Routes.jsx           # All app routes
│   │   ├── services/                # API services
│   │   │   └── api.js               # Axios API calls
│   │   ├── App.css                  # App-specific styles
│   │   ├── App.jsx                  # Root component
│   │   ├── index.css                # Global styles + Tailwind
│   │   └── main.jsx                 # React entry point
│   ├── .env.example                 # Environment variables template
│   ├── .env.local                   # Local environment variables (gitignored)
│   ├── .gitignore                   # Git ignore rules
│   ├── eslint.config.js             # ESLint configuration
│   ├── index.html                   # HTML entry point
│   ├── package.json                 # Frontend dependencies
│   ├── postcss.config.js            # PostCSS configuration
│   ├── tailwind.config.js           # Tailwind CSS configuration
│   └── vite.config.js               # Vite build configuration
│
├── Server/                          # Backend Node.js Application
│   ├── controllers/                 # Request handlers
│   │   ├── categoryController.js    # Category CRUD operations
│   │   ├── orderController.js       # Order management
│   │   ├── productController.js     # Product CRUD operations
│   │   └── userController.js        # User operations
│   ├── middleware/                  # Express middleware
│   │   └── auth.js                  # Firebase token verification
│   ├── models/                      # Database models
│   │   ├── Category.js              # Category model
│   │   ├── Order.js                 # Order model
│   │   ├── Product.js               # Product model
│   │   └── User.js                  # User model
│   ├── routes/                      # API routes
│   │   ├── categoryRoutes.js        # Category endpoints
│   │   ├── orderRoutes.js           # Order endpoints
│   │   ├── productRoutes.js         # Product endpoints
│   │   └── userRoutes.js            # User endpoints
│   ├── .env                         # Environment variables (gitignored)
│   ├── .env.example                 # Environment template
│   ├── .gitignore                   # Git ignore rules
│   ├── index.js                     # Server entry point
│   ├── package.json                 # Backend dependencies
│   └── seed.js                      # Database seeding script
│
├── DEPLOYMENT.md                    # Deployment guide
├── PROJECT_STRUCTURE.md             # This file
├── QUICKSTART.md                    # Quick setup guide
└── README.md                        # Main documentation
```

## Component Hierarchy

### Frontend Component Tree

```
App
└── AuthProvider
    └── CartProvider
        └── RouterProvider
            └── MainLayout
                ├── Navbar
                ├── Outlet (Page Content)
                │   ├── Home
                │   │   └── ProductCard (multiple)
                │   ├── CategoryPage
                │   │   └── ProductCard (multiple)
                │   ├── ProductDetail
                │   ├── Cart
                │   ├── Checkout
                │   ├── Orders
                │   ├── Profile
                │   ├── Login
                │   ├── Register
                │   └── Admin Pages
                │       ├── AdminDashboard
                │       ├── AdminProducts
                │       ├── AdminCategories
                │       ├── AdminOrders
                │       └── ProductForm
                └── Footer
```

## Data Flow

### Authentication Flow

```
User Action → Firebase Auth → AuthContext → useAuth Hook → Components
                                    ↓
                            Backend API (token verification)
                                    ↓
                            MongoDB (user data)
```

### Shopping Cart Flow

```
Add to Cart → CartContext → localStorage
                  ↓
            useCart Hook
                  ↓
            Cart Components
                  ↓
            Checkout → API → MongoDB (order)
```

### Product Management Flow

```
Admin Action → API Call → Auth Middleware → Controller → Model → MongoDB
                                                              ↓
                                                        Response → Frontend
```

## API Endpoints Structure

### Public Endpoints

```
GET  /                          # API status
GET  /api/products              # List all products
GET  /api/products/:id          # Get single product
GET  /api/categories            # List all categories
```

### Protected User Endpoints

```
GET  /api/user/me               # Get current user
GET  /api/orders/my-orders      # Get user orders
POST /api/orders                # Create order
```

### Protected Admin Endpoints

```
POST   /api/products            # Create product
PUT    /api/products/:id        # Update product
DELETE /api/products/:id        # Delete product
POST   /api/categories          # Create category
PUT    /api/categories/:id      # Update category
DELETE /api/categories/:id      # Delete category
GET    /api/orders              # Get all orders
PATCH  /api/orders/:id/status   # Update order status
```

## Database Schema

### Collections

#### users

```javascript
{
  _id: ObjectId,
  firebaseUid: String,
  name: String,
  email: String,
  role: String,              // "user" or "admin"
  createdAt: Date
}
```

#### categories

```javascript
{
  _id: ObjectId,
  name: String,
  slug: String,              // URL-friendly name
  createdAt: Date
}
```

#### products

```javascript
{
  _id: ObjectId,
  title: String,
  price: Number,
  image: String,             // URL
  categoryId: String,        // Reference to category
  stock: Number,
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### orders

```javascript
{
  _id: ObjectId,
  userId: String,            // Firebase UID
  products: [
    {
      productId: String,
      title: String,
      price: Number,
      quantity: Number
    }
  ],
  total: Number,
  status: String,            // "pending", "processing", "shipped", "delivered", "cancelled"
  shippingInfo: Object,
  createdAt: Date,
  updatedAt: Date
}
```

## State Management

### AuthContext State

```javascript
{
  user: Object | null,       // Firebase user object
  loading: Boolean,
  isAdmin: Boolean,
  register: Function,
  login: Function,
  googleLogin: Function,
  logout: Function
}
```

### CartContext State

```javascript
{
  cart: Array,               // Array of products with quantity
  addToCart: Function,
  removeFromCart: Function,
  updateQuantity: Function,
  clearCart: Function,
  cartTotal: Number,
  cartCount: Number
}
```

## Environment Variables

### Frontend (.env.local)

```
VITE_API_URL                    # Backend API URL
VITE_FIREBASE_API_KEY           # Firebase API key
VITE_FIREBASE_AUTH_DOMAIN       # Firebase auth domain
VITE_FIREBASE_PROJECT_ID        # Firebase project ID
VITE_FIREBASE_STORAGE_BUCKET    # Firebase storage bucket
VITE_FIREBASE_MESSAGING_SENDER_ID  # Firebase messaging sender ID
VITE_FIREBASE_APP_ID            # Firebase app ID
```

### Backend (.env)

```
PORT                            # Server port (default: 5000)
MONGO_URI                       # MongoDB connection string
FIREBASE_PROJECT_ID             # Firebase project ID
FIREBASE_CLIENT_EMAIL           # Firebase service account email
FIREBASE_PRIVATE_KEY            # Firebase service account private key
```

## Key Features by File

### Frontend

**Navbar.jsx**

- Logo and navigation links
- Cart icon with item count
- User authentication status
- Responsive mobile menu

**ProductCard.jsx**

- Product image
- Title and price
- Stock status
- Add to cart button

**PrivateRoute.jsx**

- Protects user-only routes
- Redirects to login if not authenticated
- Shows loading state

**AdminRoute.jsx**

- Protects admin-only routes
- Checks user role
- Redirects non-admins

**Home.jsx**

- Hero section
- Category grid
- Featured products
- Promotional banner

**Cart.jsx**

- Cart items list
- Quantity controls
- Remove items
- Order summary
- Checkout button

**Checkout.jsx**

- Shipping form
- Order summary
- Place order functionality

**AdminDashboard.jsx**

- Quick links to admin features
- Statistics cards
- Navigation to management pages

**AdminProducts.jsx**

- Product list table
- Edit/Delete actions
- Add product button

**ProductForm.jsx**

- Reusable form for add/edit
- Category selection
- Image URL input
- Stock management

### Backend

**auth.js (middleware)**

- Verifies Firebase ID tokens
- Extracts user information
- Checks admin role

**productController.js**

- CRUD operations for products
- Category filtering
- Stock management

**orderController.js**

- Create orders
- Fetch user orders
- Admin order management
- Status updates

**Product.js (model)**

- Database operations
- Query methods
- Stock updates

**Order.js (model)**

- Order creation
- Status management
- User order queries

## Security Measures

1. **Authentication**

   - Firebase token verification
   - Secure password handling
   - Google OAuth integration

2. **Authorization**

   - Role-based access control
   - Protected routes (frontend)
   - Protected endpoints (backend)

3. **Data Protection**

   - Environment variables for secrets
   - HTTPS in production
   - Input validation

4. **Database Security**
   - MongoDB connection string in env
   - Parameterized queries
   - No direct database exposure

## Performance Optimizations

1. **Frontend**

   - Code splitting with React Router
   - Lazy loading components
   - Optimized images
   - Tailwind CSS purging

2. **Backend**

   - Efficient database queries
   - Connection pooling
   - Proper indexing

3. **Caching**
   - LocalStorage for cart
   - Browser caching for static assets

## Testing Strategy

### Frontend Testing

- Component unit tests
- Integration tests for user flows
- E2E tests for critical paths

### Backend Testing

- API endpoint tests
- Authentication tests
- Database operation tests

### Manual Testing Checklist

- [ ] User registration/login
- [ ] Product browsing
- [ ] Add to cart
- [ ] Checkout process
- [ ] Order placement
- [ ] Admin product management
- [ ] Admin order management
- [ ] Responsive design
- [ ] Cross-browser compatibility

## Future Enhancements

### Phase 1

- Product search functionality
- Product filtering and sorting
- Wishlist feature
- Product reviews and ratings

### Phase 2

- Payment gateway integration (Stripe)
- Email notifications
- Order tracking
- Inventory management

### Phase 3

- Advanced analytics dashboard
- Promotional codes/coupons
- Multi-language support
- Mobile app (React Native)

---

This structure provides a solid foundation for a scalable e-commerce platform. Each component is modular and can be extended independently.
