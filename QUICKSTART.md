# 🚀 Quick Start Guide - HnilaBazar

Get your e-commerce platform running in minutes!

## Prerequisites Checklist

- [ ] Node.js installed (v16+)
- [ ] MongoDB database ready (local or Atlas)
- [ ] Firebase project created

## Step 1: Firebase Setup (5 minutes)

### Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Name it "HnilaBazar" (or your choice)
4. Disable Google Analytics (optional)

### Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click "Get started"
3. Enable **Email/Password** sign-in method
4. Enable **Google** sign-in method

### Get Firebase Config

1. Go to **Project Settings** (gear icon)
2. Scroll to "Your apps" section
3. Click web icon (</>) to add a web app
4. Copy the `firebaseConfig` object

### Get Firebase Admin SDK

1. In **Project Settings**, go to **Service Accounts** tab
2. Click "Generate new private key"
3. Save the JSON file securely

## Step 2: Backend Setup (3 minutes)

```bash
cd Server
npm install
```

Create `Server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/HnilaBazar
# Or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/HnilaBazar

# From Firebase Admin SDK JSON file:
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour\nPrivate\nKey\nHere\n-----END PRIVATE KEY-----\n"
```

**Important:** Keep the quotes around FIREBASE_PRIVATE_KEY and preserve the `\n` characters!

Seed the database:

```bash
npm run seed
```

Start the server:

```bash
npm run dev
```

You should see:

```
✅ MongoDB connected successfully (HnilaBazar)
🔥 Server running on port 5000
```

## Step 3: Frontend Setup (2 minutes)

```bash
cd Client
npm install
```

Create `Client/.env.local`:

```env
VITE_API_URL=http://localhost:5000/api

# From Firebase Config (Step 1):
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

Start the frontend:

```bash
npm run dev
```

Visit: http://localhost:5173

## Step 4: Create Admin User (1 minute)

1. Register a new user through the frontend
2. Open MongoDB (Compass, Atlas, or CLI)
3. Find your user in the `users` collection
4. Update the role field:

**MongoDB Compass:**

- Find the user document
- Edit the `role` field from `"user"` to `"admin"`
- Save

**MongoDB CLI:**

```javascript
use HnilaBazar
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

5. Refresh the frontend and you'll see the Admin Dashboard link!

## 🎉 You're Done!

### Test the Application

**Public Features:**

- Browse products on home page
- View categories (Men's, Women's, Electronics, Baby)
- View product details
- Add items to cart

**User Features (after login):**

- Complete checkout
- View order history
- Access profile

**Admin Features (after setting admin role):**

- Access admin dashboard
- Add/edit/delete products
- Manage categories
- View and update order status

## 🐛 Troubleshooting

### Backend won't start

- Check MongoDB connection string
- Ensure MongoDB is running
- Verify all environment variables are set

### Frontend won't start

- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check if port 5173 is available

### Authentication not working

- Verify Firebase config is correct
- Check Firebase Authentication is enabled
- Ensure `.env.local` file exists (not `.env`)

### Admin features not showing

- Verify user role is set to "admin" in MongoDB
- Logout and login again
- Check browser console for errors

## 📚 Next Steps

1. **Customize Design:** Edit Tailwind colors in `Client/tailwind.config.js`
2. **Add Real Images:** Replace placeholder images with actual product photos
3. **Configure Payment:** Integrate Stripe or PayPal
4. **Deploy:** Follow deployment guide in README.md

## 💡 Tips

- Use MongoDB Atlas for free cloud database
- Use environment variables for all secrets
- Test with different user roles
- Check browser console for errors
- Use MongoDB Compass for easy database management

## 🆘 Need Help?

Common issues and solutions:

**"Cannot connect to MongoDB"**

- Ensure MongoDB is running locally, or
- Use MongoDB Atlas connection string

**"Firebase auth not working"**

- Double-check all Firebase env variables
- Ensure Authentication is enabled in Firebase Console

**"Admin features not accessible"**

- Verify user role is "admin" in database
- Clear browser cache and login again

---

Happy coding! 🚀
