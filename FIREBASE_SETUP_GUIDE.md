# 🔥 Firebase Setup Guide - Step by Step

## Current Issue

You're seeing: `Firebase: Error (auth/api-key-not-valid.-please-pass-a-valid-api-key.)`

This means you need to configure Firebase with your actual project credentials.

---

## 📋 Step-by-Step Firebase Setup

### Step 1: Create Firebase Project (5 minutes)

1. **Go to Firebase Console**

   - Visit: https://console.firebase.google.com/
   - Sign in with your Google account

2. **Create New Project**

   - Click "Add project" or "Create a project"
   - Enter project name: `HnilaBazar` (or any name you prefer)
   - Click "Continue"

3. **Google Analytics (Optional)**
   - You can disable this for now
   - Click "Create project"
   - Wait for project creation (30 seconds)
   - Click "Continue"

---

### Step 2: Enable Authentication (2 minutes)

1. **In Firebase Console, click "Authentication"** (left sidebar)
2. **Click "Get started"**
3. **Enable Email/Password:**

   - Click "Email/Password" in the Sign-in method tab
   - Toggle "Enable" to ON
   - Click "Save"

4. **Enable Google Sign-In:**
   - Click "Google" in the Sign-in method tab
   - Toggle "Enable" to ON
   - Select a support email
   - Click "Save"

---

### Step 3: Get Firebase Web Config (3 minutes)

1. **In Firebase Console, click the gear icon ⚙️** (next to "Project Overview")
2. **Click "Project settings"**
3. **Scroll down to "Your apps" section**
4. **Click the web icon `</>`** (if no app exists)

   - App nickname: `HnilaBazar Web`
   - Don't check "Firebase Hosting"
   - Click "Register app"

5. **Copy the Firebase Configuration**

   You'll see something like this:

   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abcdef123456",
   };
   ```

6. **Copy these values** - you'll need them in the next step!

---

### Step 4: Update Client/.env.local

Open `Client/.env.local` and replace the placeholder values with your actual Firebase config:

```env
VITE_API_URL=http://localhost:5000/api

# Replace these with YOUR Firebase config values:
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

**Important:**

- Copy the EXACT values from Firebase Console
- Don't add quotes around the values
- Make sure there are no extra spaces

---

### Step 5: Get Firebase Admin SDK (For Backend)

1. **In Firebase Console, go to Project Settings** (gear icon ⚙️)
2. **Click "Service accounts" tab**
3. **Click "Generate new private key"**
4. **Click "Generate key"** - A JSON file will download
5. **Open the downloaded JSON file**

You'll see something like:

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com",
  ...
}
```

---

### Step 6: Update Server/.env

Open `Server/.env` and add these values:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/HnilaBazar

# From the downloaded JSON file:
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour\nPrivate\nKey\nHere\n-----END PRIVATE KEY-----\n"
```

**Important for FIREBASE_PRIVATE_KEY:**

- Keep the quotes around it: `"..."`
- Keep the `\n` characters (don't replace with actual newlines)
- Copy the entire private_key value from the JSON

---

### Step 7: Restart Servers

After updating the environment files:

```bash
# Stop both servers (Ctrl+C)

# Restart Backend
cd Server
npm run dev

# Restart Frontend (new terminal)
cd Client
npm run dev
```

---

## ✅ Verification

After restarting, test the following:

1. **Open http://localhost:5173**
2. **Click "Register"**
3. **Try to create an account**
4. **If no error appears, Firebase is configured correctly!** ✅

---

## 🐛 Troubleshooting

### Still getting API key error?

**Check these:**

1. ✅ All environment variables start with `VITE_` in `.env.local`
2. ✅ No quotes around the values
3. ✅ No extra spaces
4. ✅ Frontend server was restarted after changes
5. ✅ `.env.local` is in the `Client` folder (not root)

### Can't find Firebase config?

1. Go to Firebase Console
2. Click gear icon ⚙️ → Project settings
3. Scroll to "Your apps"
4. If no app, click web icon `</>` to create one
5. Copy the config object

### Private key error on backend?

Make sure:

1. Private key has quotes: `FIREBASE_PRIVATE_KEY="..."`
2. Keep the `\n` characters
3. Copy the entire key including BEGIN and END lines

---

## 📝 Quick Reference

### Where to find each value:

| Variable            | Location in Firebase Console                |
| ------------------- | ------------------------------------------- |
| API Key             | Project Settings → Your apps → Config       |
| Auth Domain         | Project Settings → Your apps → Config       |
| Project ID          | Project Settings → General                  |
| Storage Bucket      | Project Settings → Your apps → Config       |
| Messaging Sender ID | Project Settings → Your apps → Config       |
| App ID              | Project Settings → Your apps → Config       |
| Client Email        | Service Accounts → Generate key → JSON file |
| Private Key         | Service Accounts → Generate key → JSON file |

---

## 🎯 Example (with fake values)

**Client/.env.local:**

```env
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=AIzaSyABCDEF123456789ABCDEFGHIJK
VITE_FIREBASE_AUTH_DOMAIN=hnilabazar-12345.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=hnilabazar-12345
VITE_FIREBASE_STORAGE_BUCKET=hnilabazar-12345.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abc123def456
```

**Server/.env:**

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/HnilaBazar
FIREBASE_PROJECT_ID=hnilabazar-12345
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-abc12@hnilabazar-12345.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

---

## ⏱️ Time Required

- Create Firebase project: 2 minutes
- Enable authentication: 2 minutes
- Get web config: 2 minutes
- Get admin SDK: 2 minutes
- Update env files: 2 minutes
- **Total: ~10 minutes**

---

## 🆘 Still Having Issues?

1. Double-check all values are copied correctly
2. Make sure no extra characters or spaces
3. Verify `.env.local` is in `Client` folder
4. Verify `.env` is in `Server` folder
5. Restart both servers after changes
6. Check browser console for specific error messages
7. Try in incognito mode

---

## ✅ Success!

Once configured correctly, you should be able to:

- Register new users
- Login with email/password
- Login with Google
- Access protected routes
- Use all authentication features

**Next:** Follow QUICKSTART.md to complete the rest of the setup!
