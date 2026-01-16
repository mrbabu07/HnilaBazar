# 🚀 Getting Started - Quick Reference

## ⚡ 5-Minute Quick Start

### 1. Prerequisites Check

```bash
node --version    # Should be v16+
npm --version     # Should be 8+
mongosh          # Should connect (or have Atlas URI)
```

### 2. Install Dependencies

```bash
# Backend
cd Server
npm install

# Frontend (new terminal)
cd Client
npm install
```

### 3. Configure Environment

**Server/.env**

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/HnilaBazar
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-email@project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

**Client/.env.local**

```env
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abc123
```

### 4. Seed Database

```bash
cd Server
npm run seed
```

### 5. Start Servers

```bash
# Terminal 1 - Backend
cd Server
npm run dev

# Terminal 2 - Frontend
cd Client
npm run dev
```

### 6. Open Browser

```
http://localhost:5173
```

---

## 📋 Essential Commands

### Backend

```bash
npm run dev      # Start development server
npm start        # Start production server
npm run seed     # Seed database with sample data
```

### Frontend

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 🔑 First Steps After Setup

### 1. Register a User

- Go to http://localhost:5173/register
- Create an account with email/password
- Or use Google sign-in

### 2. Make User Admin

```javascript
// In MongoDB
use HnilaBazar
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

### 3. Test Features

- ✅ Browse products
- ✅ Add to cart
- ✅ Checkout
- ✅ View orders
- ✅ Access admin dashboard

---

## 🎯 Key URLs

### Frontend

- Homepage: http://localhost:5173
- Login: http://localhost:5173/login
- Register: http://localhost:5173/register
- Cart: http://localhost:5173/cart
- Admin: http://localhost:5173/admin

### Backend

- API Root: http://localhost:5000
- Products: http://localhost:5000/api/products
- Categories: http://localhost:5000/api/categories

---

## 🔧 Common Issues & Quick Fixes

### Port Already in Use

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### MongoDB Not Connected

```bash
# Start MongoDB
# Mac: brew services start mongodb-community
# Windows: net start MongoDB
# Linux: sudo systemctl start mongod

# Or use MongoDB Atlas connection string
```

### Firebase Auth Not Working

1. Check all VITE\_ prefixed variables in .env.local
2. Restart frontend server after adding env vars
3. Enable Email/Password in Firebase Console
4. Add localhost to authorized domains

### Admin Features Not Showing

1. Update user role in MongoDB to "admin"
2. Logout and login again
3. Clear browser cache

---

## 📚 Documentation Quick Links

- **Setup Guide:** [QUICKSTART.md](QUICKSTART.md)
- **Full Documentation:** [README.md](README.md)
- **Troubleshooting:** [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- **Deployment:** [DEPLOYMENT.md](DEPLOYMENT.md)
- **Features:** [FEATURES.md](FEATURES.md)
- **Checklist:** [CHECKLIST.md](CHECKLIST.md)

---

## 🎨 Customization Quick Tips

### Change Colors

Edit `Client/tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#YOUR_COLOR',
      secondary: '#YOUR_COLOR',
      accent: '#YOUR_COLOR',
    },
  },
}
```

### Change Site Name

1. Update `Client/src/components/Navbar.jsx`
2. Update `Client/index.html` title
3. Update README.md

### Add Products

1. Login as admin
2. Go to Admin Dashboard
3. Click "Products" → "Add Product"
4. Fill form and submit

---

## 🚀 Deployment Quick Steps

### 1. MongoDB Atlas

- Create free cluster
- Get connection string
- Update MONGO_URI

### 2. Backend (Railway)

- Connect GitHub repo
- Set environment variables
- Deploy

### 3. Frontend (Vercel)

- Connect GitHub repo
- Set environment variables
- Deploy

**Detailed guide:** [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 💡 Pro Tips

1. **Use MongoDB Compass** for easy database management
2. **Keep .env files secure** - never commit them
3. **Test locally first** before deploying
4. **Use browser DevTools** for debugging
5. **Check console logs** for errors
6. **Read error messages** carefully

---

## 🆘 Need Help?

1. Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. Review browser console for errors
3. Check server terminal for logs
4. Verify all environment variables
5. Try in incognito mode
6. Clear cache and restart

---

## ✅ Success Checklist

- [ ] Both servers running without errors
- [ ] Can access frontend at localhost:5173
- [ ] Can register and login
- [ ] Products display on homepage
- [ ] Can add items to cart
- [ ] Can complete checkout
- [ ] Admin dashboard accessible (after setting role)

---

## 🎉 You're Ready!

Once all checks pass, you have a fully functional e-commerce platform!

**Next Steps:**

1. Explore all features
2. Customize design
3. Add your products
4. Deploy to production
5. Share with the world!

---

**Estimated Setup Time:** 15-30 minutes

**Questions?** Check the documentation files or review the code comments.

**Happy Building! 🚀**
