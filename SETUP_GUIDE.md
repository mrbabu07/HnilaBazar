# 🚀 HnilaBazar - Complete Setup Guide

Step-by-step guide to get HnilaBazar running on your machine.

## 📋 Prerequisites

Before you begin, ensure you have:

- ✅ Node.js (v16 or higher) - [Download](https://nodejs.org/)
- ✅ MongoDB - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- ✅ Firebase Account - [Create Account](https://firebase.google.com/)
- ✅ Git - [Download](https://git-scm.com/)
- ✅ Code Editor (VS Code recommended)

## 🔧 Step 1: Clone Repository

```bash
git clone <repository-url>
cd HnilaBazar
```

## 🗄️ Step 2: Setup MongoDB

### Option A: Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service
3. MongoDB will run on `mongodb://localhost:27017`

### Option B: MongoDB Atlas (Recommended)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (free tier available)
3. Create database user
4. Whitelist your IP address
5. Get connection string

## 🔥 Step 3: Setup Firebase

1. Go to https://console.firebase.google.com/
2. Create new project
3. Enable Authentication:
   - Go to Authentication → Sign-in method
   - Enable Email/Password
   - Enable Google (optional)
4. Get Firebase config:
   - Go to Project Settings → General
   - Scroll to "Your apps"
   - Click Web app icon
   - Copy configuration
5. Generate service account key:
   - Go to Project Settings → Service accounts
   - Click "Generate new private key"
   - Save the JSON file

## 🖥️ Step 4: Setup Backend (Server)

```bash
cd Server
npm install
```

### Create .env file

```bash
cp .env.example .env
```

### Edit .env with your credentials

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/HnilaBazar
# Or MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/HnilaBazar

# Firebase Admin SDK (from service account JSON)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-Here\n-----END PRIVATE KEY-----\n"
```

### Seed Database

```bash
npm run seed
```

This will create:

- Sample products
- Categories
- Admin user
- Test data

### Start Server

```bash
npm run dev
```

Server should start on http://localhost:5000

## 💻 Step 5: Setup Frontend (Client)

Open a new terminal:

```bash
cd Client
npm install
```

### Create .env.local file

```bash
cp .env.example .env.local
```

### Edit .env.local

```env
VITE_API_URL=http://localhost:5000/api

# Firebase Config (from Firebase console)
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### Start Client

```bash
npm run dev
```

Client should start on http://localhost:5173

## ✅ Step 6: Verify Installation

### Test Backend

Open browser: http://localhost:5000
You should see: `{"message": "HnilaBazar API is running 🚀"}`

### Test Frontend

Open browser: http://localhost:5173
You should see the homepage

### Test Database

```bash
cd Server
npm run check:flash
```

Should show database connection status

## 👤 Step 7: Create Admin User

### Option A: Use Seed Data

The seed script creates an admin user:

- Email: admin@hnilabazar.com
- Password: admin123

### Option B: Make Existing User Admin

```bash
cd Server
node makeAdmin.js <user-email>
```

## 🎯 Step 8: Test Features

### Test Flash Sales

```bash
cd Server
npm run seed:flash
```

Then visit: http://localhost:5173/flash-sales

### Test Admin Panel

1. Login with admin credentials
2. Visit: http://localhost:5173/admin
3. Explore all admin features

### Test Live Chat

1. Open any page
2. Look for chat widget in bottom-right
3. Click to test

## 🐛 Troubleshooting

### Server won't start

**Error**: `EADDRINUSE: address already in use`
**Solution**: Port 5000 is in use. Kill the process or change PORT in .env

**Error**: `MongoServerError: Authentication failed`
**Solution**: Check MongoDB credentials in .env

**Error**: `Firebase Admin SDK not configured`
**Solution**: Verify Firebase credentials in .env

### Client won't start

**Error**: `EADDRINUSE: address already in use`
**Solution**: Port 5173 is in use. Kill the process or change port in vite.config.js

**Error**: `Failed to fetch`
**Solution**: Ensure backend is running and VITE_API_URL is correct

### Authentication errors

**Error**: `Invalid token`
**Solution**:

- Check Firebase config in .env.local
- Verify Firebase project settings
- Clear browser cache and cookies

### Database errors

**Error**: `MongoNetworkError`
**Solution**:

- Check MongoDB is running
- Verify connection string
- Check network/firewall settings

## 📚 Next Steps

1. ✅ Read [README.md](README.md) for project overview
2. ✅ Read [FEATURES.md](FEATURES.md) for feature documentation
3. ✅ Explore the admin panel
4. ✅ Test all features
5. ✅ Customize for your needs

## 🔐 Security Notes

### Before Deployment

- [ ] Change default admin password
- [ ] Update Firebase security rules
- [ ] Set up environment variables on hosting
- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable MongoDB authentication
- [ ] Review and update .gitignore

### Production Checklist

- [ ] Remove console.logs
- [ ] Minify and optimize code
- [ ] Set NODE_ENV=production
- [ ] Configure CDN for static assets
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy
- [ ] Set up SSL certificates
- [ ] Configure domain and DNS

## 🚀 Deployment

### Backend Deployment (Railway/Render)

1. Create account on Railway or Render
2. Connect GitHub repository
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel/Netlify)

1. Create account on Vercel or Netlify
2. Connect GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variables
6. Deploy

### Database (MongoDB Atlas)

Already cloud-hosted if using Atlas

## 📞 Support

If you encounter issues:

1. Check this guide again
2. Review error messages carefully
3. Check browser console for errors
4. Check server logs
5. Search for similar issues online
6. Ask for help in project discussions

## 🎉 Success!

If everything is working:

- ✅ Backend running on port 5000
- ✅ Frontend running on port 5173
- ✅ Database connected
- ✅ Authentication working
- ✅ Admin panel accessible

You're ready to start developing! 🚀

---

**Happy Coding!** 💻
