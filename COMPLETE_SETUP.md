# 🎯 Complete Setup Guide - All Steps

## Overview

You need to configure **two** environment files:

1. **Client/.env.local** - Frontend Firebase config
2. **Server/.env** - Backend Firebase Admin SDK + MongoDB

---

## 📋 Prerequisites

- [ ] Firebase account created
- [ ] MongoDB Atlas account (you already have this ✅)
- [ ] Node.js installed
- [ ] Both Client and Server dependencies installed

---

## 🔥 Part 1: Firebase Setup (One Time)

### Step 1: Create Firebase Project (2 min)

1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Name: "HnilaBazar"
4. Disable Google Analytics (optional)
5. Click "Create project"

### Step 2: Enable Authentication (2 min)

1. Click "Authentication" in left sidebar
2. Click "Get started"
3. Enable "Email/Password" sign-in method
4. Enable "Google" sign-in method

---

## 💻 Part 2: Frontend Configuration (5 min)

### Step 1: Get Web App Config

1. In Firebase Console, click gear icon ⚙️ → "Project settings"
2. Scroll to "Your apps" section
3. Click web icon `</>`
4. App nickname: "HnilaBazar Web"
5. Click "Register app"
6. Copy the config object

### Step 2: Update Client/.env.local

Open `Client/.env.local` and replace with your values:

```env
VITE_API_URL=http://localhost:5000/api

# Replace these with YOUR Firebase config:
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abc123def456
```

**Where to find these:**

- Firebase Console → Project Settings → Your apps → Config

---

## 🖥️ Part 3: Backend Configuration (5 min)

### Step 1: Get Admin SDK Credentials

1. In Firebase Console, click gear icon ⚙️ → "Project settings"
2. Click "Service accounts" tab
3. Click "Generate new private key"
4. Click "Generate key" - JSON file downloads
5. Open the JSON file

### Step 2: Update Server/.env

Your `Server/.env` already has MongoDB configured ✅

Add these three Firebase values:

```env
PORT=5000
MONGO_URI=mongodb+srv://HnilaBazar:xHqM3rt6033jSsdo@cluster0.g6xesjf.mongodb.net/HnilaBazar?retryWrites=true&w=majority&appName=Cluster0

# Copy from the downloaded JSON file:
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour\nPrivate\nKey\nHere\n-----END PRIVATE KEY-----\n"
```

**Important for FIREBASE_PRIVATE_KEY:**

- Keep the quotes: `"..."`
- Keep the `\n` characters
- Copy entire key from JSON file's `private_key` field

---

## 🗄️ Part 4: Database Setup (2 min)

Your MongoDB is already configured ✅

Just seed the database:

```bash
cd Server
npm run seed
```

You should see:

```
✅ Connected to MongoDB
✅ Inserted 4 categories
✅ Inserted 16 products
🎉 Database seeded successfully!
```

---

## 🚀 Part 5: Start Everything (2 min)

### Terminal 1 - Backend

```bash
cd Server
npm run dev
```

Expected output:

```
✅ MongoDB connected successfully (HnilaBazar)
🔥 Server running on port 5000
```

### Terminal 2 - Frontend

```bash
cd Client
npm run dev
```

Expected output:

```
VITE v7.2.4  ready in XXX ms
➜  Local:   http://localhost:5173/
```

---

## ✅ Part 6: Verification (3 min)

### Test Frontend

1. Open http://localhost:5173
2. Homepage should load with products ✅
3. Click "Register"
4. Try to create an account
5. If no Firebase error → Success! ✅

### Test Backend

1. Open http://localhost:5000
2. Should see: `{"message":"HnilaBazar API is running 🚀",...}` ✅

### Test Full Flow

1. Register a new user
2. Login with that user
3. Add products to cart
4. Go to checkout
5. Place an order
6. View order history

---

## 👑 Part 7: Create Admin User (2 min)

### Option 1: MongoDB Atlas Web Interface

1. Go to MongoDB Atlas
2. Click "Browse Collections"
3. Select "HnilaBazar" database
4. Select "users" collection
5. Find your user
6. Click "Edit"
7. Change `role` from `"user"` to `"admin"`
8. Click "Update"

### Option 2: MongoDB Compass

1. Open MongoDB Compass
2. Connect with your connection string
3. Navigate to HnilaBazar → users
4. Find your user document
5. Edit the `role` field to `"admin"`
6. Save

### Option 3: MongoDB Shell

```javascript
use HnilaBazar
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

### Verify Admin Access

1. Logout and login again
2. Go to Profile
3. You should see "Admin" badge
4. Click "Admin Dashboard"
5. You can now manage products, categories, and orders! ✅

---

## 📊 Summary Checklist

### Firebase Setup

- [ ] Firebase project created
- [ ] Email/Password authentication enabled
- [ ] Google authentication enabled
- [ ] Web app registered
- [ ] Admin SDK key generated

### Frontend Configuration

- [ ] Client/.env.local updated with Firebase config
- [ ] All 6 VITE*FIREBASE*\* variables set
- [ ] Frontend starts without errors
- [ ] Can access http://localhost:5173

### Backend Configuration

- [ ] Server/.env updated with Firebase Admin SDK
- [ ] FIREBASE_PROJECT_ID set
- [ ] FIREBASE_CLIENT_EMAIL set
- [ ] FIREBASE_PRIVATE_KEY set (with quotes and \n)
- [ ] Backend starts without errors
- [ ] MongoDB connects successfully

### Database

- [ ] Seed script ran successfully
- [ ] 4 categories inserted
- [ ] 16 products inserted
- [ ] Can see products on homepage

### Testing

- [ ] Can register new user
- [ ] Can login with email/password
- [ ] Can login with Google
- [ ] Can add products to cart
- [ ] Can checkout and place order
- [ ] Can view order history

### Admin Setup

- [ ] User role changed to "admin" in database
- [ ] Can access admin dashboard
- [ ] Can manage products
- [ ] Can manage categories
- [ ] Can manage orders

---

## 🎉 Success!

Once all checkboxes are checked, you have a fully functional e-commerce platform!

---

## 📚 Detailed Guides

If you need more help with any step:

- **FIREBASE_SETUP_GUIDE.md** - Detailed frontend Firebase setup
- **BACKEND_FIREBASE_SETUP.md** - Detailed backend Firebase setup
- **QUICK_FIX.md** - Quick troubleshooting
- **TROUBLESHOOTING.md** - Common issues and solutions
- **QUICKSTART.md** - Alternative setup guide

---

## 🐛 Common Issues

### Frontend: "API key not valid"

→ Check Client/.env.local has correct Firebase config
→ Restart frontend server after changes

### Backend: "must contain project_id"

→ Check Server/.env has all three Firebase variables
→ Verify FIREBASE_PRIVATE_KEY has quotes and \n

### Products not showing

→ Run seed script: `cd Server && npm run seed`
→ Check MongoDB connection

### Admin features not showing

→ Update user role to "admin" in MongoDB
→ Logout and login again

---

## ⏱️ Total Time

- Firebase setup: 5 minutes
- Frontend config: 5 minutes
- Backend config: 5 minutes
- Database seed: 2 minutes
- Testing: 5 minutes
- Admin setup: 2 minutes

**Total: ~25 minutes**

---

## 🚀 Next Steps

After setup is complete:

1. **Customize** - Change colors, add your branding
2. **Add Products** - Use admin panel to add real products
3. **Test Thoroughly** - Try all features
4. **Deploy** - Follow DEPLOYMENT.md when ready
5. **Extend** - Add new features as needed

---

**You're all set! Happy building! 🎉**
