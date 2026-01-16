# 🔑 How to Copy Firebase Private Key - Visual Guide

## The Error You're Seeing

```
Failed to parse private key: Error: Only 8, 16, 24, or 32 bits supported: 88
```

This means the `FIREBASE_PRIVATE_KEY` in `Server/.env` is not formatted correctly.

---

## ✅ Correct Way to Copy Private Key

### Step 1: Download Firebase Admin SDK JSON

1. Go to Firebase Console: https://console.firebase.google.com/
2. Select your project
3. Click gear icon ⚙️ → "Project settings"
4. Click "Service accounts" tab
5. Click "Generate new private key"
6. Click "Generate key" - a JSON file downloads

### Step 2: Open the JSON File

The file will look like this:

```json
{
  "type": "service_account",
  "project_id": "hnilabazar-abc123",
  "private_key_id": "xyz789...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASC...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-abc@hnilabazar-abc123.iam.gserviceaccount.com",
  ...
}
```

### Step 3: Copy the Three Values

You need these three fields:

1. `project_id`
2. `client_email`
3. `private_key`

### Step 4: Update Server/.env

**IMPORTANT:** Copy the `private_key` value EXACTLY as it appears in the JSON, including the quotes!

**Server/.env should look like this:**

```env
PORT=5000
MONGO_URI=mongodb+srv://HnilaBazar:xHqM3rt6033jSsdo@cluster0.g6xesjf.mongodb.net/HnilaBazar

FIREBASE_PROJECT_ID=hnilabazar-abc123
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-abc@hnilabazar-abc123.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASC...\n-----END PRIVATE KEY-----\n"
```

---

## ⚠️ Common Mistakes

### ❌ WRONG - No quotes

```env
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...
```

### ❌ WRONG - Actual newlines instead of \n

```env
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASC...
-----END PRIVATE KEY-----"
```

### ❌ WRONG - Missing BEGIN/END

```env
FIREBASE_PRIVATE_KEY="MIIEvQIBADANBgkqhkiG9w0BAQEFAASC..."
```

### ✅ CORRECT - Quotes + \n as text

```env
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASC...\n-----END PRIVATE KEY-----\n"
```

---

## 📝 Step-by-Step Copy Instructions

1. Open the downloaded JSON file in a text editor (Notepad, VS Code, etc.)
2. Find the line that starts with `"private_key":`
3. Select from the opening quote AFTER the colon to the closing quote
4. Copy it (Ctrl+C or Cmd+C)
5. Open `Server/.env`
6. Paste it after `FIREBASE_PRIVATE_KEY=`

**Example:**

From JSON:

```json
"private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQI...\n-----END PRIVATE KEY-----\n",
```

Copy this part (including quotes):

```
"-----BEGIN PRIVATE KEY-----\nMIIEvQI...\n-----END PRIVATE KEY-----\n"
```

Paste in .env:

```env
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQI...\n-----END PRIVATE KEY-----\n"
```

---

## ✅ Verification

After updating Server/.env, restart the server:

```bash
cd Server
npm run dev
```

You should see:

```
✅ Firebase Admin SDK initialized
✅ MongoDB connected successfully
🔥 Server running on port 5000
```

If you see errors, the credentials are still not correct.

---

## 🆘 Still Having Issues?

Try this:

1. Delete the old JSON file
2. Generate a NEW private key in Firebase Console
3. Download the new JSON file
4. Copy the values again carefully
5. Make sure to copy the ENTIRE private_key value
6. Restart the server

---

See **BACKEND_FIREBASE_SETUP.md** for more detailed instructions!
