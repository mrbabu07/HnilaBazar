# HnilaBazar - E-commerce Platform

## 🎯 Project Overview

A full-stack e-commerce platform built with React (frontend) and Node.js/Express (backend), featuring comprehensive shopping functionality with BDT (Bangladeshi Taka) currency.

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Firebase account (for authentication)

### Installation

**1. Clone and Install Dependencies**

```bash
# Install server dependencies
cd Server
npm install

# Install client dependencies
cd ../Client
npm install
```

**2. Configure Environment Variables**

**Server (.env):**

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key
VAPID_PUBLIC_KEY=your_vapid_public_key
VAPID_PRIVATE_KEY=your_vapid_private_key
VAPID_EMAIL=your_email
```

**Client (.env.local):**

```env
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**3. Start the Application**

```bash
# Start server (from Server directory)
npm start

# Start client (from Client directory)
npm run dev
```

**4. Access the Application**

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

---

## 💰 Currency Configuration

### Current Setup: BDT (Bangladeshi Taka)

All prices are:

- **Stored in USD** in the database
- **Displayed in BDT** to customers
- **Conversion rate:** 1 USD = 110 BDT

### Price Examples

| Database (USD) | Display (BDT) |
| -------------- | ------------- |
| $10            | ৳1,100        |
| $20            | ৳2,200        |
| $50            | ৳5,500        |
| $100           | ৳11,000       |

### Free Delivery Threshold

- **Default:** ৳5,500 ($50 USD)
- **Configurable via:** Admin Panel → Delivery Settings
- **Standard Delivery:** ৳100

---

## 🛠️ Key Features

### Customer Features

- ✅ Product browsing with filters and search
- ✅ Shopping cart with size/color variants
- ✅ Wishlist functionality
- ✅ Flash sales with countdown timers
- ✅ User authentication (Firebase)
- ✅ Order tracking
- ✅ Product reviews and ratings
- ✅ Loyalty points system
- ✅ Coupon codes
- ✅ Multi-language support (English, Bengali, Hindi)
- ✅ Dark mode
- ✅ PWA support

### Admin Features

- ✅ Product management
- ✅ Order management
- ✅ Flash sales management
- ✅ Coupon management
- ✅ Delivery settings configuration
- ✅ User management
- ✅ Analytics dashboard
- ✅ Inventory tracking
- ✅ Review moderation

---

## 📁 Project Structure

```
HnilaBazar/
├── Client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context providers
│   │   ├── hooks/         # Custom hooks
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   └── i18n/          # Internationalization
│   └── public/            # Static assets
│
├── Server/                # Node.js backend
│   ├── controllers/       # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── services/         # Business logic
│   └── scripts/          # Utility scripts
│
├── README.md             # Main documentation
├── FOLDER_STRUCTURE.md   # Detailed structure
├── QUICK_START.md        # Getting started guide
└── TROUBLESHOOTING.md    # Common issues
```

---

## 🔧 Admin Panel Access

### Create Admin User

```bash
cd Server
node scripts/makeAdmin.js
```

### Admin Routes

- Dashboard: `/admin`
- Products: `/admin/products`
- Orders: `/admin/orders`
- Flash Sales: `/admin/flash-sales`
- Delivery Settings: `/admin/delivery-settings`
- Coupons: `/admin/coupons`
- Users: `/admin/users`

---

## 🧪 Testing

### Seed Database

```bash
cd Server
node scripts/seedAll.js
```

### Test Flash Sales

```bash
node scripts/seedActiveFlashSales.js
```

### Update Delivery Settings

```bash
node scripts/updateDeliverySettings.js
```

---

## 🌐 API Endpoints

### Public Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/categories` - Get all categories
- `GET /api/flash-sales/active` - Get active flash sales
- `POST /api/user/register` - Register user
- `POST /api/user/login` - Login user

### Protected Endpoints (Require Authentication)

- `GET /api/user/me` - Get current user
- `POST /api/cart` - Add to cart
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `POST /api/wishlist` - Add to wishlist

### Admin Endpoints (Require Admin Role)

- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `PUT /api/orders/:id` - Update order status
- `POST /api/flash-sales` - Create flash sale
- `PUT /api/delivery-settings` - Update delivery settings

---

## 🎨 Customization

### Change Currency

Edit `Client/src/hooks/useCurrency.jsx`:

```javascript
const USD_TO_BDT = 110; // Change conversion rate
const CURRENCY_SYMBOL = "৳"; // Change symbol
```

### Change Free Delivery Threshold

1. Login as admin
2. Go to Delivery Settings
3. Update "Free Delivery Threshold"
4. Save changes

### Change Theme Colors

Edit `Client/tailwind.config.js`:

```javascript
colors: {
  primary: { /* your colors */ },
  secondary: { /* your colors */ },
}
```

---

## 📦 Dependencies

### Frontend

- React 18
- React Router
- Tailwind CSS
- Axios
- i18next (internationalization)
- Firebase (authentication)

### Backend

- Express
- MongoDB/Mongoose
- Firebase Admin SDK
- Web Push (notifications)
- Multer (file uploads)

---

## 🐛 Troubleshooting

### Server won't start

- Check MongoDB connection string
- Verify all environment variables are set
- Check if port 5000 is available

### Client won't connect to server

- Verify `VITE_API_URL` in `.env.local`
- Check if server is running
- Clear browser cache

### Prices showing incorrectly

- Verify `useCurrency` hook is imported
- Check conversion rate in hook
- Clear browser cache and hard refresh

### Admin panel not accessible

- Run `makeAdmin.js` script to create admin user
- Verify Firebase authentication is working
- Check user role in database

---

## 📝 Recent Updates

### Latest Changes (February 2026)

- ✅ Converted all prices to BDT display
- ✅ Fixed free delivery threshold (now ৳5,500)
- ✅ Updated flash sales to show BDT
- ✅ Added dynamic delivery settings
- ✅ Enhanced admin panel

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📄 License

This project is private and proprietary.

---

## 📞 Support

For issues or questions:

1. Check TROUBLESHOOTING.md
2. Review FOLDER_STRUCTURE.md
3. Check server logs for errors
4. Verify environment variables

---

## 🎯 Next Steps

After setup:

1. ✅ Run seed scripts to populate database
2. ✅ Create admin user
3. ✅ Test product browsing
4. ✅ Test cart and checkout
5. ✅ Configure delivery settings
6. ✅ Create flash sales
7. ✅ Test admin panel features

---

**Last Updated:** February 3, 2026
**Version:** 1.0.0
**Status:** Production Ready ✅
