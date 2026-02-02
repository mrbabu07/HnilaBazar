# Security Setup Guide

## ✅ Security Measures Implemented

### 1. Environment Variables Protection

All sensitive data is now properly secured:

- ✅ `.env` files are in `.gitignore`
- ✅ `.env.example` files have placeholder values only
- ✅ Real credentials removed from example files

### 2. What's Protected

#### Server/.env (NEVER commit this file)

- MongoDB connection string with password
- Firebase Admin SDK private key
- VAPID private key for push notifications
- Email addresses

#### Client/.env.local (NEVER commit this file)

- Firebase API keys
- ImgBB API key
- VAPID keys

## 🔐 Setup Instructions for New Developers

### Step 1: Clone the Repository

```bash
git clone <your-repo-url>
cd HnilaBazar
```

### Step 2: Setup Server Environment

```bash
cd Server
cp .env.example .env
```

Edit `Server/.env` and add your actual values:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database

FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

VAPID_PUBLIC_KEY=your_public_key
VAPID_PRIVATE_KEY=your_private_key
VAPID_EMAIL=mailto:your@email.com
```

### Step 3: Setup Client Environment

```bash
cd ../Client
cp .env.example .env.local
```

Edit `Client/.env.local` and add your actual values:

```env
VITE_API_URL=http://localhost:5000/api

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef

VITE_IMGBB_API_KEY=your_imgbb_key
VITE_VAPID_PUBLIC_KEY=your_vapid_public_key
```

### Step 4: Generate New VAPID Keys (Recommended)

```bash
cd Server
npx web-push generate-vapid-keys
```

Copy the generated keys to both:

- `Server/.env` (both public and private keys)
- `Client/.env.local` (public key only)

### Step 5: Install Dependencies

```bash
# Server
cd Server
npm install

# Client
cd ../Client
npm install
```

### Step 6: Start Development

```bash
# Terminal 1 - Server
cd Server
npm run dev

# Terminal 2 - Client
cd Client
npm run dev
```

## 🔑 How to Get API Keys

### MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string from "Connect" button
4. Replace `<password>` with your database password

### Firebase

1. Go to https://console.firebase.google.com/
2. Create/Select your project
3. Go to Project Settings > General
4. Copy the Firebase config values
5. For Admin SDK: Go to Service Accounts > Generate new private key

### ImgBB

1. Go to https://api.imgbb.com/
2. Sign up for free account
3. Get your API key from dashboard

### VAPID Keys

```bash
npx web-push generate-vapid-keys
```

## ⚠️ IMPORTANT Security Rules

### ❌ NEVER Do This:

- ❌ Commit `.env` files to Git
- ❌ Share API keys publicly
- ❌ Push real credentials to GitHub
- ❌ Use production keys in development
- ❌ Hardcode secrets in source code

### ✅ ALWAYS Do This:

- ✅ Use `.env.example` with placeholders
- ✅ Keep `.env` in `.gitignore`
- ✅ Rotate keys if accidentally exposed
- ✅ Use different keys for dev/prod
- ✅ Store production secrets in hosting platform

## 🚨 If You Accidentally Exposed Secrets

### Immediate Actions:

1. **Rotate All Keys Immediately**
   - Generate new VAPID keys
   - Create new Firebase service account
   - Change MongoDB password
   - Get new ImgBB API key

2. **Remove from Git History**

   ```bash
   # Use BFG Repo Cleaner or git filter-branch
   # Better: Delete repo and create new one
   ```

3. **Update All Environments**
   - Update production environment variables
   - Update team members' local `.env` files
   - Update CI/CD secrets

## 📋 Pre-Push Checklist

Before pushing to Git, verify:

- [ ] No `.env` files in commit
- [ ] No API keys in code
- [ ] No passwords in code
- [ ] `.gitignore` is up to date
- [ ] `.env.example` has placeholders only
- [ ] No sensitive data in comments

## 🔍 Check for Exposed Secrets

Run this before pushing:

```bash
# Check if .env is tracked
git ls-files | grep .env

# Should return nothing or only .env.example files
```

## 🌐 Production Deployment

### Environment Variables Setup

#### Vercel/Netlify

Add environment variables in dashboard:

- Go to Project Settings > Environment Variables
- Add all variables from `.env.example`
- Use production values

#### Heroku

```bash
heroku config:set MONGO_URI="your_production_uri"
heroku config:set VAPID_PUBLIC_KEY="your_key"
# ... add all variables
```

#### Railway/Render

- Add environment variables in dashboard
- Use production values
- Enable auto-deploy from Git

## ✅ Current Security Status

- ✅ All sensitive files in `.gitignore`
- ✅ Example files have placeholders only
- ✅ No real credentials in repository
- ✅ VAPID keys secured
- ✅ Firebase keys secured
- ✅ MongoDB credentials secured
- ✅ ImgBB API key secured

## 📞 Support

If you need help setting up:

1. Check `.env.example` files for required variables
2. Follow this guide step by step
3. Ensure all API keys are valid
4. Check console for specific errors

---

**Remember**: Security is not optional. Always protect your credentials! 🔐
