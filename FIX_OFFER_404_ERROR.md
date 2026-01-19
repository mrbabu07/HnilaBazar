# Fix: Offer Routes 404 Error

## Problem

Getting `404 (Not Found)` when trying to create offers at `POST http://localhost:5000/api/offers`

## Root Cause

The offer routes were using `isAdmin` middleware but the auth file exports `verifyAdmin`.

## ✅ Fix Applied

Changed `Server/routes/offerRoutes.js` to use `verifyAdmin` instead of `isAdmin`.

---

## 🔧 Steps to Fix

### 1. **Restart Your Backend Server**

The server needs to be restarted to pick up the route changes.

**Stop the current server:**

- Press `Ctrl + C` in the terminal running the server

**Start it again:**

```bash
cd Server
node index.js
```

OR if using nodemon:

```bash
cd Server
nodemon index.js
```

### 2. **Verify Server Startup**

You should see these messages in the console:

```
✅ MongoDB connected successfully (HnilaBazar)
🔧 Registering routes...
✅ Products routes registered
✅ Categories routes registered
✅ Orders routes registered
✅ User routes registered
✅ Wishlist routes registered
✅ Reviews routes registered
✅ Coupons routes registered
✅ Addresses routes registered
✅ Returns routes registered
✅ Payments routes registered
✅ Offers routes registered  ← LOOK FOR THIS
🔥 Server running on port 5000
```

### 3. **Test the Offer Routes**

After restarting, try creating an offer again from the admin panel.

---

## 🧪 Quick Test (Optional)

You can test if the routes are working with curl or Postman:

### Test Public Route (No Auth Required)

```bash
curl http://localhost:5000/api/offers/active-popup
```

Expected response:

```json
{
  "success": true,
  "data": null
}
```

### Test Admin Route (Requires Auth)

This will return 401 without a token, which is correct:

```bash
curl http://localhost:5000/api/offers
```

Expected response:

```json
{
  "error": "No token provided"
}
```

---

## 📋 Checklist

Before creating an offer, ensure:

- ✅ Backend server is running on port 5000
- ✅ You see "✅ Offers routes registered" in console
- ✅ MongoDB is connected
- ✅ You're logged in as an admin user
- ✅ The `uploads/` folder exists in the Server directory

---

## 🆘 If Still Not Working

### Check 1: Verify uploads folder exists

```bash
cd Server
mkdir uploads
```

### Check 2: Verify you're an admin

Check your user in MongoDB:

```javascript
// In MongoDB Compass or shell
db.users.findOne({ email: "your-email@example.com" });
// Should have: role: "admin"
```

### Check 3: Check browser console

Open DevTools → Console tab and look for:

- Network errors
- Authentication errors
- CORS errors

### Check 4: Verify environment variables

Check `Server/.env` has:

```
MONGO_URI=your_mongodb_connection_string
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY="your_private_key"
```

---

## 🎯 After Restart

1. **Refresh your browser** (or clear cache)
2. **Navigate to** `/admin/offers`
3. **Click** "Create Offer"
4. **Fill the form** and submit
5. **Should work!** ✅

---

## What Was Changed

**File: `Server/routes/offerRoutes.js`**

**Before:**

```javascript
const { verifyToken, isAdmin } = require("../middleware/auth");
// ...
router.post("/", verifyToken, isAdmin, upload.single("image"), createOffer);
```

**After:**

```javascript
const { verifyToken, verifyAdmin } = require("../middleware/auth");
// ...
router.post("/", verifyToken, verifyAdmin, upload.single("image"), createOffer);
```

This ensures the middleware matches what's actually exported from `auth.js`.
