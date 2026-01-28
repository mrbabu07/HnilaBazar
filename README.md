# 🛍️ HnilaBazar - E-Commerce Platform

A full-stack e-commerce platform built with React, Node.js, Express, and MongoDB.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- Firebase account (for authentication)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd HnilaBazar
   ```

2. **Setup Server**

   ```bash
   cd Server
   npm install
   cp .env.example .env
   # Edit .env with your credentials
   npm run seed  # Seed database with sample data
   npm run dev   # Start server
   ```

3. **Setup Client**

   ```bash
   cd Client
   npm install
   cp .env.example .env.local
   # Edit .env.local with API URL
   npm run dev   # Start client
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## 📁 Project Structure

```
HnilaBazar/
├── Client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context providers
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API services
│   │   └── utils/         # Utility functions
│   └── public/            # Static assets
│
├── Server/                # Node.js backend
│   ├── controllers/       # Request handlers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── services/         # Business logic
│
└── README.md             # This file
```

## ✨ Features

### Customer Features

- 🛒 **Shopping Cart** - Add, update, remove items
- ❤️ **Wishlist** - Save favorite products
- 🔍 **Product Search** - Advanced search and filters
- 📊 **Product Comparison** - Compare up to 4 products
- ⚡ **Flash Sales** - Limited time deals with countdown timers
- 🎯 **Product Reviews** - Rate and review products
- 📦 **Order Tracking** - Track order status
- 💳 **Multiple Payment Methods** - Card, UPI, COD
- 🎫 **Coupons** - Apply discount codes
- 🔔 **Notifications** - Real-time updates
- 💬 **Live Chat** - Tawk.to integration
- 🌐 **Multi-language** - English, Bengali, Hindi
- 🌙 **Dark Mode** - Theme toggle
- 📱 **PWA** - Install as mobile app

### Admin Features

- 📊 **Analytics Dashboard** - Sales, revenue, customer insights
- 📦 **Product Management** - CRUD operations
- 🏷️ **Category Management** - Organize products
- 📋 **Order Management** - Process and track orders
- 👥 **User Management** - Manage customers and staff
- 🎫 **Coupon Management** - Create discount codes
- ⚡ **Flash Sales Management** - Create time-limited deals
- 🎁 **Offer Management** - Promotional banners
- 📈 **Customer Insights** - Behavior analytics
- 💬 **Support Tickets** - Customer support
- 🔄 **Returns Management** - Handle returns/refunds
- ⭐ **Review Management** - Moderate reviews
- 📊 **Inventory Tracking** - Stock management

## 🔧 Environment Variables

### Server (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key
```

### Client (.env.local)

```env
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 📚 API Documentation

### Public Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/categories` - Get all categories
- `GET /api/flash-sales/active` - Get active flash sales
- `GET /api/flash-sales/upcoming` - Get upcoming flash sales

### Protected Endpoints (Require Authentication)

- `POST /api/orders` - Create order
- `GET /api/orders/my-orders` - Get user orders
- `POST /api/wishlist` - Add to wishlist
- `POST /api/reviews` - Create review
- `GET /api/addresses` - Get user addresses

### Admin Endpoints (Require Admin Role)

- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/admin/insights` - Get customer insights
- `POST /api/flash-sales` - Create flash sale
- `GET /api/admin/users` - Get all users

## 🛠️ Available Scripts

### Server

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run seed       # Seed database with sample data
npm run seed:flash # Add sample flash sales
npm run check:flash # Check flash sales status
npm run test:flash # Test flash sales API
```

### Client

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## 🎨 Tech Stack

### Frontend

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Axios** - HTTP client
- **i18next** - Internationalization
- **Firebase** - Authentication
- **Lucide React** - Icons

### Backend

- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Firebase Admin** - Authentication
- **Multer** - File uploads
- **Nodemailer** - Email service

## 🔐 Authentication

The app uses **Firebase Authentication** for user management:

- Email/Password login
- Google OAuth
- JWT tokens for API authentication
- Role-based access control (User/Admin)

## 📦 Database Models

- **User** - Customer and admin accounts
- **Product** - Product catalog
- **Category** - Product categories
- **Order** - Customer orders
- **Review** - Product reviews
- **Wishlist** - User wishlists
- **Cart** - Shopping carts
- **Coupon** - Discount codes
- **FlashSale** - Time-limited deals
- **Offer** - Promotional banners
- **Address** - Shipping addresses
- **Return** - Return requests
- **SupportTicket** - Customer support
- **CustomerInsight** - Analytics data

## 🚀 Deployment

### Server Deployment

1. Set environment variables
2. Build: `npm install --production`
3. Start: `npm start`
4. Use PM2 for process management

### Client Deployment

1. Update API URL in .env
2. Build: `npm run build`
3. Deploy `dist` folder to hosting service
4. Configure routing for SPA

### Recommended Hosting

- **Frontend**: Vercel, Netlify, Cloudflare Pages
- **Backend**: Railway, Render, Heroku
- **Database**: MongoDB Atlas

## 🧪 Testing

### Test Flash Sales

```bash
cd Server
npm run test:flash
```

### Test Customer Insights

```bash
# Navigate to admin panel
http://localhost:5173/admin/insights
```

### Test Live Chat

```bash
# Open any page and look for chat widget
http://localhost:5173
```

## 📖 Feature Documentation

### Flash Sales

- **Location**: `/flash-sales`
- **Admin Panel**: `/admin/flash-sales`
- **Features**: Countdown timers, stock tracking, auto-expiration
- **API**: `/api/flash-sales/*`

### Customer Insights

- **Location**: `/admin/insights`
- **Features**: Segmentation, analytics, preferences tracking
- **Segments**: New, Regular, VIP customers
- **API**: `/api/admin/insights/*`

### Live Chat

- **Provider**: Tawk.to
- **Location**: All pages (bottom-right widget)
- **Features**: User identification, theme support
- **Dashboard**: https://dashboard.tawk.to

### Product Comparison

- **Location**: `/compare`
- **Features**: Compare up to 4 products side-by-side
- **Floating Button**: Shows comparison count

### Reviews & Ratings

- **Location**: Product detail pages
- **Features**: Star ratings, verified purchases, helpful votes
- **Moderation**: Admin review management

## 🐛 Troubleshooting

### Server won't start

- Check MongoDB connection
- Verify environment variables
- Check port 5000 is available

### Client won't start

- Clear node_modules and reinstall
- Check Vite config
- Verify API URL in .env.local

### Authentication errors

- Verify Firebase credentials
- Check token expiration
- Ensure user has correct role

### Database errors

- Check MongoDB connection string
- Verify database exists
- Run seed script if empty

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Firebase for authentication
- MongoDB for database
- Tawk.to for live chat
- Tailwind CSS for styling
- React community for amazing tools

## 📞 Support

For support, email support@hnilabazar.com or join our Slack channel.

---

**Made with ❤️ by HnilaBazar Team**
