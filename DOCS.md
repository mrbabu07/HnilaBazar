# 📚 HnilaBazar - Complete Documentation

**Version:** 2.0.0  
**Last Updated:** February 5, 2026  
**Status:** Production Ready ✅

---

## 📖 Table of Contents

1. [Quick Start](#quick-start)
2. [Project Overview](#project-overview)
3. [Features](#features)
4. [Setup Guide](#setup-guide)
5. [Configuration](#configuration)
6. [Payment Methods](#payment-methods)
7. [Troubleshooting](#troubleshooting)
8. [Deployment](#deployment)
9. [API Reference](#api-reference)
10. [Security](#security)
11. [Changelog](#changelog)

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)
- Firebase account

### Installation (5 minutes)

```bash
# 1. Clone and install
git clone <repository-url>
cd HnilaBazar

# 2. Install dependencies
cd Server && npm install
cd ../Client && npm install

# 3. Setup environment files
# Copy .env.example to .env in both folders

# 4. Seed database
cd Server
npm run seed

# 5. Start servers (2 terminals)
# Terminal 1
cd Server && npm start

# Terminal 2
cd Client && npm run dev
```

**Access:** http://localhost:5174 (Frontend) | http://localhost:5000 (Backend)

---

## 📋 Project Overview

### Tech Stack

**Frontend:**

- React 18 + Vite
- Tailwind CSS
- React Router v6
- Firebase Auth
- i18next (Multi-language)

**Backend:**

- Node.js + Express
- MongoDB + Mongoose
- Firebase Admin SDK
- Nodemailer (Email)
- PDFKit (Invoices)

### Project Structure

```
HnilaBazar/
├── Client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── context/      # State management
│   │   ├── hooks/        # Custom hooks
│   │   ├── services/     # API services
│   │   └── utils/        # Utilities
│   └── public/           # Static assets
│
├── Server/                # Node.js backend
│   ├── controllers/      # Request handlers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── middleware/      # Auth middleware
│   ├── scripts/         # Utility scripts
│   └── invoices/        # Generated PDFs
│
└── DOCS.md              # This file
```

---

## ✨ Features

### Customer Features

- 🛍️ Product browsing with filters & search
- 🛒 Shopping cart with size/color selection
- ❤️ Wishlist management
- ⚡ Flash sales with countdown timers
- 🎁 Loyalty program (4 tiers: Bronze, Silver, Gold, Platinum)
- 🔔 Stock alerts (back-in-stock, price drop)
- ⭐ Product reviews with images
- 📦 Order tracking
- 🔄 Return requests
- 💳 Multiple payment methods (COD, bKash, Nagad, Rocket)
- 🌐 Multi-language (English, Bengali, Hindi)
- 🌙 Dark mode
- 📱 PWA support

### Admin Features

- 📊 Analytics dashboard
- 📦 Product management (CRUD)
- 📋 Order management
- 👥 User management
- ⚡ Flash sales management
- 🎫 Coupon management
- 📊 Inventory tracking
- 💬 Support ticket system
- ⭐ Review moderation
- 📈 Customer insights

---

## 🔧 Setup Guide

### 1. Environment Configuration

**Server/.env:**

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/HnilaBazar
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Key\n-----END PRIVATE KEY-----\n"
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=mdjahedulislamjaved@gmail.com
SMTP_PASS=your-app-password
IMGBB_API_KEY=your-imgbb-key
```

**Client/.env.local:**

```env
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_IMGBB_API_KEY=your-imgbb-key
```

### 2. Database Seeding

```bash
cd Server
npm run seed        # Basic data (products, categories)
npm run seed:all    # All features (flash sales, loyalty, etc.)
```

### 3. Create Admin User

```bash
# Register a user first, then:
cd Server
npm run make:admin your-email@example.com
```

---

## 💳 Payment Methods

### bKash

**Option 1: Merchant Account (RECOMMENDED) ⭐**

- **Number:** 01521721946
- **Method:** Use **"Payment"** option in bKash app
- **NOT "Send Money"** - This is important!
- **Type:** Merchant/Business account
- **Lower fees, faster processing**

**Option 2: Personal Account (Alternative)**

- **Number:** 01621937035
- **Method:** Use **"Send Money"** option
- **Type:** Personal account

### Nagad

- **Number:** 01521721946
- **Method:** Use **"Send Money"** option

### Rocket

- **Number:** 016219370359
- **Method:** Use **"Send Money"** option or dial \*322#

### Cash on Delivery (COD)

- Available for all orders
- No transaction ID required

### Transaction ID Feature

- Required for mobile banking payments
- Saves to database for verification
- Displays in admin panel
- Included in PDF invoices
- Copy button for easy access

---

## 🐛 Troubleshooting

### Server Won't Start

**Issue:** Port already in use

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change port in Server/.env
PORT=5001
```

**Issue:** MongoDB connection failed

```bash
# Check MongoDB is running
mongod

# Or verify Atlas connection string
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/HnilaBazar
```

### Frontend Issues

**Issue:** API calls failing (ERR_CONNECTION_REFUSED)

```bash
# Ensure backend is running
cd Server
npm start
```

**Issue:** Build errors

```bash
# Clear cache and rebuild
rm -rf node_modules/.vite
npm run build
```

### Transaction ID Not Saving

**Fixed!** ✅ Transaction ID now saves correctly to database.

**Verify:**

```bash
cd Server
node scripts/testTransactionId.js
```

### Common Errors

**"Cannot find module"**

```bash
npm install
```

**"Firebase authentication error"**

- Check Firebase credentials in .env files
- Verify FIREBASE_PRIVATE_KEY has proper line breaks

**"No products showing"**

```bash
cd Server
npm run seed
```

---

## 🚀 Deployment

### Backend (Railway/Render/Heroku)

1. **Set environment variables** in hosting dashboard
2. **Deploy:**
   ```bash
   git push origin main
   ```
3. **Post-deployment:**
   ```bash
   npm run seed
   npm run make:admin
   ```

### Frontend (Vercel/Netlify)

1. **Update .env.local:**
   ```env
   VITE_API_URL=https://your-backend-url.com/api
   ```
2. **Build:**
   ```bash
   npm run build
   ```
3. **Deploy:**
   ```bash
   vercel --prod
   # or
   netlify deploy --prod --dir=dist
   ```

### Database (MongoDB Atlas)

1. Create cluster at https://cloud.mongodb.com
2. Create database user
3. Whitelist IP: 0.0.0.0/0
4. Get connection string
5. Update MONGODB_URI

---

## 📡 API Reference

### Public Endpoints

```
GET    /api/products                    # Get all products
GET    /api/products/:id                # Get product by ID
GET    /api/categories                  # Get all categories
GET    /api/flash-sales/active          # Get active flash sales
GET    /api/offers                      # Get active offers
```

### Protected Endpoints (Require Auth)

```
POST   /api/orders                      # Create order
GET    /api/orders/my-orders            # Get user orders
GET    /api/wishlist                    # Get user wishlist
POST   /api/wishlist                    # Add to wishlist
POST   /api/reviews                     # Create review
GET    /api/loyalty/my-points           # Get loyalty points
POST   /api/stock-alerts/subscribe      # Subscribe to alert
```

### Admin Endpoints (Require Admin Role)

```
GET    /api/orders                      # Get all orders
PUT    /api/orders/:id/status           # Update order status
POST   /api/products                    # Create product
PUT    /api/products/:id                # Update product
DELETE /api/products/:id                # Delete product
GET    /api/admin/users                 # Get all users
GET    /api/admin/insights              # Get customer insights
```

---

## 🔐 Security

### Authentication Flow

1. User registers/logs in via Firebase
2. Firebase generates JWT token
3. Client sends token in Authorization header
4. Server verifies token with Firebase Admin SDK
5. User ID extracted from verified token

### Security Checklist

**Environment Variables:**

- ✅ No API keys in code
- ✅ No database credentials in code
- ✅ All secrets in .env files
- ✅ .env files in .gitignore

**Firebase:**

- ✅ Admin SDK properly configured
- ✅ Client SDK properly configured
- ✅ Token verification on all protected routes

**Database:**

- ✅ MongoDB connection secured
- ✅ User passwords hashed (Firebase handles this)
- ✅ Input validation on all endpoints

**API:**

- ✅ CORS configured
- ✅ Rate limiting (recommended for production)
- ✅ Input sanitization
- ✅ Error handling

---

## 📝 Changelog

### [2.0.0] - 2026-02-05

#### Added

- ✅ Transaction ID feature for mobile banking payments
- ✅ Transaction ID input field in checkout
- ✅ Transaction ID display in admin panel with copy button
- ✅ Transaction ID included in PDF invoices
- ✅ Test script for verifying transaction IDs
- ✅ Clear payment instructions (Payment vs Send Money)

#### Fixed

- ✅ **Critical:** Transaction ID now saves correctly to database (was null)
- ✅ Backend controller properly extracts transaction ID
- ✅ Google Sign-In registers users in database
- ✅ Payment instructions clarified for bKash

#### Changed

- ✅ Updated contact information:
  - Phone: +880 1521-721946
  - Email: mdjahedulislamjaved@gmail.com
- ✅ Updated payment numbers with clear instructions
- ✅ Improved checkout UI (responsive design)
- ✅ Enhanced payment instructions with color-coded cards

#### Removed

- ✅ Debug console.log statements from production code
- ✅ Unnecessary documentation files

### Technical Details

**Files Modified:**

- `Server/controllers/orderController.js` - Extract transactionId
- `Server/services/invoiceService.js` - Display in invoices
- `Client/src/pages/Checkout.jsx` - Remove debug logs, clarify instructions

**Root Cause:** Backend wasn't extracting `transactionId` from request body

**Solution:** Added `transactionId` to destructured parameters and passed to Order model

---

## 🛠️ Available Scripts

### Server Scripts

```bash
npm start              # Start production server
npm run dev            # Start with nodemon (auto-reload)
npm run seed           # Seed basic data
npm run seed:all       # Seed all features
npm run make:admin     # Create admin user
npm run test:all       # Test all APIs
```

### Client Scripts

```bash
npm run dev            # Start development server
npm run build          # Build for production
npm run preview        # Preview production build
npm run lint           # Run ESLint
```

---

## 📞 Contact & Support

**Business Contact:**

- Phone: +880 1521-721946
- Email: mdjahedulislamjaved@gmail.com

**Payment Numbers:**

- bKash Merchant (Payment): 01521721946 ⭐
- bKash Personal (Send Money): 01621937035
- Nagad (Send Money): 01521721946
- Rocket (Send Money): 016219370359

**Technical Support:**

- Check this documentation
- Review code comments
- Test API endpoints
- Check server logs

---

## 🎯 Quick Reference

### Daily Development

```bash
# Start backend
cd Server && npm start

# Start frontend
cd Client && npm run dev

# Access
Frontend: http://localhost:5174
Backend: http://localhost:5000
Admin: http://localhost:5174/admin
```

### Testing Transaction ID

```bash
cd Server
node scripts/testTransactionId.js
```

### Create Test Order

1. Go to checkout
2. Select bKash/Nagad/Rocket
3. Enter transaction ID: `TEST123456`
4. Complete order
5. Check admin panel
6. Verify in database

---

## 📚 Additional Resources

### Documentation Files

- **README.md** - Main project documentation
- **DOCS.md** - This comprehensive guide
- **.env.example** - Environment variable templates

### Important Directories

- `Server/scripts/` - Utility scripts
- `Server/invoices/` - Generated PDF invoices
- `Client/src/i18n/locales/` - Translation files

---

**Made with ❤️ by HnilaBazar Team**

**Status:** Production Ready ✅  
**Last Updated:** February 5, 2026  
**Version:** 2.0.0
