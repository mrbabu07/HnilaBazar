# ⚡ Quick Fix - Firebase API Key Error

## The Error You're Seeing

```
Firebase: Error (auth/api-key-not-valid.-please-pass-a-valid-api-key.)
```

## Why This Happens

Your `Client/.env.local` file has placeholder values instead of real Firebase credentials.

---

## 🚀 Quick Fix (10 Minutes)

### Option 1: Follow Detailed Guide

👉 Open **FIREBASE_SETUP_GUIDE.md** for complete step-by-step instructions

### Option 2: Quick Steps

#### 1. Create Firebase Project

- Go to https://console.firebase.google.com/
- Click "Add project"
- Name it "HnilaBazar"
- Create project

#### 2. Enable Authentication

- Click "Authentication" → "Get started"
- Enable "Email/Password"
- Enable "Google"

#### 3. Get Your Config

- Click gear icon ⚙️ → "Project settings"
- Scroll to "Your apps"
- Click web icon `</>`
- Copy the config values

#### 4. Update Client/.env.local

Replace the placeholder values with your actual Firebase config:

```env
VITE_API_URL=http://localhost:5000/api

VITE_FIREBASE_API_KEY=AIzaSy... (your actual key)
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abc123
```

#### 5. Restart Frontend

```bash
# Stop the server (Ctrl+C)
# Start again
npm run dev
```

#### 6. Test

- Open http://localhost:5173
- Try to register
- No error = Success! ✅

---

## 📍 Where to Find Each Value

All values are in Firebase Console → Project Settings → Your apps:

```
Firebase Console
  └── ⚙️ Project Settings
      └── Your apps (scroll down)
          └── SDK setup and configuration
              └── Config (radio button)
                  └── Copy these values ✅
```

---

## 🎯 What Your .env.local Should Look Like

**Before (❌ Wrong):**

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
```

**After (✅ Correct):**

```env
VITE_FIREBASE_API_KEY=AIzaSyABCDEF123456789ABCDEFGHIJK
```

---

## ⚠️ Common Mistakes

1. ❌ Forgetting to restart the server after changes
2. ❌ Adding quotes around values: `"AIzaSy..."` (wrong)
3. ❌ Extra spaces before or after values
4. ❌ Not using `VITE_` prefix
5. ❌ Putting .env.local in wrong folder (should be in `Client/`)

---

## ✅ Checklist

- [ ] Created Firebase project
- [ ] Enabled Email/Password authentication
- [ ] Enabled Google authentication
- [ ] Got Firebase web config
- [ ] Updated `Client/.env.local` with real values
- [ ] Restarted frontend server
- [ ] Tested registration - no error!

---

## 🆘 Still Not Working?

### Check These:

1. Is `.env.local` in the `Client` folder? (not root)
2. Did you restart the server after changes?
3. Are all values copied exactly from Firebase?
4. No quotes around the values?
5. All variables start with `VITE_`?

### Get More Help:

- Read **FIREBASE_SETUP_GUIDE.md** for detailed instructions
- Check **TROUBLESHOOTING.md** for common issues
- Look at browser console for specific errors

---

## 🎉 Once Fixed

After Firebase is configured, you can:

- ✅ Register users
- ✅ Login with email/password
- ✅ Login with Google
- ✅ Access all features

Then continue with the rest of the setup in **QUICKSTART.md**!

---

**Time to fix: 10 minutes**
**Difficulty: Easy** 🟢
