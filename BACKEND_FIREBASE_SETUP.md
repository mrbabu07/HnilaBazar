# 🔧 Backend Firebase Setup Guide

## Current Error

```
FirebaseAppError: Service account object must contain a string "project_id" property.
```

## Why This Happens

Your `Server/.env` file is missing Firebase Admin SDK credentials needed for the backend to verify user tokens.

---

## 🚀 Quick Fix (5 Minutes)

### Step 1: Get Firebase Admin SDK Credentials

1. **Go to Firebase Console**

   - Visit: https://console.firebase.google.com/
   - Select your project (HnilaBazar)

2. **Navigate to Service Accounts**

   - Click the gear icon ⚙️ (next to "Project Overview")
   - Click "Project settings"
   - Click the "Service accounts" tab

3. **Generate Private Key**

   - You'll see: "Firebase Admin SDK"
   - Click "Generate new private key" button
   - Click "Generate key" in the confirmation dialog
   - A JSON file will download (e.g., `hnilabazar-12345-firebase-adminsdk-xxxxx.json`)

4. **Open the Downloaded JSON File**

   It will look like this:

   ```json
   {
     "type": "service_account",
     "project_id": "hnilabazar-12345",
     "private_key_id": "abc123...",
     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASC...\n-----END PRIVATE KEY-----\n",
     "client_email": "firebase-adminsdk-abc12@hnilabazar-12345.iam.gserviceaccount.com",
     "client_id": "123456789012345678901",
     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
     "token_uri": "https://oauth2.googleapis.com/token",
     ...
   }
   ```

5. **Copy These Three Values:**
   - `project_id`
   - `client_email`
   - `private_key`

---

### Step 2: Update Server/.env

Open `Server/.env` and add the three Firebase values:

```env
PORT=5000
MONGO_URI=mongodb+srv://HnilaBazar:xHqM3rt6033jSsdo@cluster0.g6xesjf.mongodb.net/HnilaBazar?retryWrites=true&w=majority&appName=Cluster0

# Copy these from the downloaded JSON file:
FIREBASE_PROJECT_ID=hnilabazar-12345
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-abc12@hnilabazar-12345.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASC...\n-----END PRIVATE KEY-----\n"
```

---

### Step 3: Important Notes for FIREBASE_PRIVATE_KEY

⚠️ **CRITICAL:** The private key must be formatted correctly:

1. **Keep the quotes:** `FIREBASE_PRIVATE_KEY="..."`
2. **Keep the \n characters:** Don't replace `\n` with actual newlines
3. **Copy the entire key:** Including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
4. **One line:** The entire key should be on one line with `\n` as text

**Example (correct format):**

```env
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASC...\n-----END PRIVATE KEY-----\n"
```

**Wrong formats:**

```env
# ❌ No quotes
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...

# ❌ Actual newlines instead of \n
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASC...
-----END PRIVATE KEY-----"

# ❌ Missing BEGIN/END
FIREBASE_PRIVATE_KEY="MIIEvQIBADANBgkqhkiG9w0BAQEFAASC..."
```

---

### Step 4: Restart Backend Server

```bash
# Stop the server (Ctrl+C if running)
cd Server
node index.js
```

You should see:

```
✅ MongoDB connected successfully (HnilaBazar)
🔥 Server running on port 5000
```

---

## 📋 Complete Server/.env Example

Here's what your complete `Server/.env` should look like:

```env
PORT=5000
MONGO_URI=mongodb+srv://HnilaBazar:xHqM3rt6033jSsdo@cluster0.g6xesjf.mongodb.net/HnilaBazar?retryWrites=true&w=majority&appName=Cluster0

FIREBASE_PROJECT_ID=hnilabazar-12345
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-abc12@hnilabazar-12345.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7L9VZ...(very long string)...xyz123\n-----END PRIVATE KEY-----\n"
```

---

## 🔍 How to Copy Private Key Correctly

### Method 1: Copy from JSON (Recommended)

1. Open the downloaded JSON file in a text editor
2. Find the `"private_key"` field
3. Copy the ENTIRE value including quotes
4. Paste into .env file

**From JSON:**

```json
"private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQI...\n-----END PRIVATE KEY-----\n"
```

**To .env:**

```env
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQI...\n-----END PRIVATE KEY-----\n"
```

### Method 2: Manual Copy

If you need to copy manually:

1. Copy everything between the quotes in the JSON
2. Make sure to include:
   - `-----BEGIN PRIVATE KEY-----\n` at the start
   - `\n-----END PRIVATE KEY-----\n` at the end
   - All the `\n` characters in between
3. Wrap the entire thing in quotes in the .env file

---

## ✅ Verification Checklist

After updating Server/.env:

- [ ] `FIREBASE_PROJECT_ID` is set (no quotes needed)
- [ ] `FIREBASE_CLIENT_EMAIL` is set (no quotes needed)
- [ ] `FIREBASE_PRIVATE_KEY` is set with quotes around it
- [ ] Private key includes `-----BEGIN PRIVATE KEY-----`
- [ ] Private key includes `-----END PRIVATE KEY-----`
- [ ] Private key has `\n` characters (not actual newlines)
- [ ] Backend server restarts without errors
- [ ] See "MongoDB connected successfully" message

---

## 🐛 Troubleshooting

### Error: "must contain a string 'project_id' property"

- ✅ Check `FIREBASE_PROJECT_ID` is set in Server/.env
- ✅ Make sure there are no typos in the variable name
- ✅ Verify the value is copied correctly from JSON

### Error: "Failed to parse private key"

- ✅ Make sure private key has quotes: `FIREBASE_PRIVATE_KEY="..."`
- ✅ Keep the `\n` characters (don't replace with actual newlines)
- ✅ Copy the entire key including BEGIN and END lines
- ✅ No extra spaces before or after the key

### Error: "Invalid service account"

- ✅ Verify all three values are from the same JSON file
- ✅ Make sure you downloaded the key from the correct Firebase project
- ✅ Check that the service account is active in Firebase Console

### Server still won't start

1. Delete the downloaded JSON file (keep it safe first!)
2. Generate a new private key in Firebase Console
3. Copy the values again
4. Update Server/.env
5. Restart server

---

## 🎯 Quick Reference

### Where to Get Each Value

| Variable              | Location in JSON File                          |
| --------------------- | ---------------------------------------------- |
| FIREBASE_PROJECT_ID   | `project_id` field                             |
| FIREBASE_CLIENT_EMAIL | `client_email` field                           |
| FIREBASE_PRIVATE_KEY  | `private_key` field (entire value with quotes) |

### Firebase Console Path

```
Firebase Console
  └── ⚙️ Project Settings
      └── Service accounts tab
          └── Generate new private key
              └── Download JSON file
                  └── Copy values to Server/.env
```

---

## 🔐 Security Notes

1. **Never commit the .env file** - It's already in .gitignore
2. **Keep the JSON file secure** - Don't share it publicly
3. **Don't expose these credentials** - They give admin access to your Firebase project
4. **Use different credentials** for development and production

---

## ✅ Success!

Once configured correctly, your backend will:

- ✅ Start without errors
- ✅ Connect to MongoDB
- ✅ Verify Firebase tokens
- ✅ Protect admin routes
- ✅ Handle user authentication

---

## 📚 Related Guides

- **FIREBASE_SETUP_GUIDE.md** - Frontend Firebase setup
- **QUICKSTART.md** - Complete setup guide
- **TROUBLESHOOTING.md** - Common issues

---

**Time to fix: 5 minutes**
**Difficulty: Easy** 🟢

Once both frontend and backend Firebase are configured, your authentication will work end-to-end! 🎉
