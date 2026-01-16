# HnilaBazar - Full-Stack E-commerce Platform

A professional, production-ready full-stack e-commerce application built with modern technologies.

## 🚀 Tech Stack

### Frontend

- **React** (Vite) - Fast, modern React setup
- **React Router** - Client-side routing
- **Tailwind CSS** - Professional, responsive styling
- **Context API** - State management
- **Firebase** - Authentication (Email/Password + Google)
- **Axios** - API communication

### Backend

- **Node.js + Express** - RESTful API
- **MongoDB** - Database
- **Firebase Admin** - Token verification
- **JWT** - Secure authentication

## 📁 Project Structure

```
HnilaBazar/
├── Client/                 # Frontend application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # Context providers
│   │   ├── hooks/         # Custom hooks
│   │   ├── services/      # API services
│   │   ├── routes/        # Route configuration
│   │   ├── layouts/       # Layout components
│   │   └── firebase/      # Firebase config
│   └── ...
└── Server/                # Backend application
    ├── models/            # Database models
    ├── controllers/       # Route controllers
    ├── routes/            # API routes
    ├── middleware/        # Auth middleware
    └── index.js           # Server entry point
```

## 🎯 Features

### Public Features

- Home page with hero, categories, and featured products
- Product browsing by category (Men's, Women's, Electronics, Baby)
- Product detail pages
- Shopping cart
- User authentication (Email/Password + Google)

### User Features (Protected)

- Checkout process
- Order history
- User profile

### Admin Features (Protected)

- Admin dashboard
- Product management (CRUD)
- Category management (CRUD)
- Order management
- Order status updates

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- Firebase project

### 1. Clone the Repository

```bash
git clone <repository-url>
cd HnilaBazar
```

### 2. Backend Setup

```bash
cd Server
npm install
```

Create `.env` file in Server directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key
```

Start the server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd Client
npm install
```

Create `.env.local` file in Client directory:

```env
VITE_API_URL=http://localhost:5000/api

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Start the development server:

```bash
npm run dev
```

## 🔐 Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password and Google)
3. Get your Firebase config from Project Settings
4. Generate a service account key for Firebase Admin SDK
5. Add the credentials to your `.env` files

## 📊 Database Models

### User

- firebaseUid
- name
- email
- role (user/admin)

### Category

- name
- slug

### Product

- title
- price
- image
- categoryId
- stock
- description

### Order

- userId
- products (array)
- total
- status
- createdAt

## 🔒 Security Features

- Firebase token verification
- Role-based access control (Admin/User)
- Protected routes
- Input validation
- Secure environment variables

## 🎨 UI/UX Features

- Professional e-commerce design
- Mobile-first, fully responsive
- Smooth animations and transitions
- Loading states
- Error handling
- Clean typography and spacing

## 📡 API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Categories

- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Orders

- `GET /api/orders` - Get all orders (Admin)
- `GET /api/orders/my-orders` - Get user orders
- `POST /api/orders` - Create order
- `PATCH /api/orders/:id/status` - Update order status (Admin)

### User

- `GET /api/user/me` - Get/create current user

## 🚀 Deployment

### Backend

1. Deploy to services like Heroku, Railway, or Render
2. Set environment variables
3. Ensure MongoDB is accessible

### Frontend

1. Build the project: `npm run build`
2. Deploy to Vercel, Netlify, or similar
3. Set environment variables
4. Update API URL to production backend

## 📝 Creating an Admin User

After registering a user, manually update their role in MongoDB:

```javascript
db.users.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } });
```

## 🤝 Contributing

This is a production-ready template. Feel free to customize and extend based on your needs.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🎯 Next Steps

- Add payment integration (Stripe, PayPal)
- Implement product reviews and ratings
- Add wishlist functionality
- Implement advanced search and filters
- Add email notifications
- Implement inventory management
- Add analytics dashboard
