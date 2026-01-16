# 🔑 Get Backend Firebase Credentials - Quick Guide

## ✅ Frontend is Done!

Your `Client/.env.local` is now configured with Firebase.

## 🔧 Now Get Backend Credentials (5 minutes)

### Step 1: Go to Firebase Console

1. Visit: https://console.firebase.google.com/
2. Click on your project: **hnilabazar-a984e**

### Step 2: Navigate to Service Accounts

1. Click the **gear icon ⚙️** (next to "Project Overview")
2. Click **"Project settings"**
3. Click the **"Service accounts"** tab (at the top)

### Step 3: Generate Private Key

1. You'll see "Firebase Admin SDK" section
2. Click the **"Generate new private key"** button
3. A dialog appears - Click **"Generate key"**
4. A JSON file downloads (e.g., `hnilabazar-a984e-firebase-adminsdk-xxxxx.json`)
5. **Save this file securely!**

### Step 4: Open the JSON File

Open the downloaded file in any text editor. It looks like this:

```json
{
  "type": "service_account",
  "project_id": "hnilabazar-a984e",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASC...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@hnilabazar-a984e.iam.gserviceaccount.com",
  ...
}
```

### Step 5: Copy These 3 Values

From the JSON file, copy:

1. **project_id** (should be: `hnilabazar-a984e`)
2. **client_email** (starts with `firebase-adminsdk-`)
3. **private_key** (the entire value including quotes and \n)

### Step 6: Update Server/.env

Open `Server/.env` and update these lines:

```env
PORT=5000
MONGO_URI=mongodb+srv://HnilaBazar:xHqM3rt6033jSsdo@cluster0.g6xesjf.mongodb.net/HnilaBazar?retryWrites=true&w=majority&appName=Cluster0

FIREBASE_PROJECT_ID=hnilabazar-a984e
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@hnilabazar-a984e.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASC...\n-----END PRIVATE KEY-----\n"
```

**IMPORTANT for FIREBASE_PRIVATE_KEY:**

- Copy the ENTIRE value from the JSON including the quotes
- Keep the `\n` characters (don't replace with actual newlines)
- It should be one very long line

### Step 7: Restart Both Servers

```bash
# Terminal 1 - Backend
cd Server
npm run dev

# Terminal 2 - Frontend (if not running)
cd Client
npm run dev
```

---

## ✅ Success Indicators

**Backend should show:**

```
✅ Firebase Admin SDK initialized
✅ MongoDB connected successfully (HnilaBazar)
🔥 Server running on port 5000
```

**Frontend should show:**

```
VITE v7.2.4  ready in XXX ms
➜  Local:   http://localhost:5173/
```

---

## 🎯 What to Do Next

1. **Get the JSON file** from Firebase Console (Step 2-3 above)
2. **Copy the 3 values** to `Server/.env` (Step 5-6 above)
3. **Restart backend** server
4. **Test**: Open http://localhost:5173 and try to register

---

## 🆘 Need Help?

- **HOW_TO_COPY_FIREBASE_KEY.md** - Visual guide for copying private key
- **BACKEND_FIREBASE_SETUP.md** - Detailed backend setup
- **COMPLETE_SETUP.md** - Full setup guide

---

**You're almost there! Just get the backend credentials and you're done!** 🚀
