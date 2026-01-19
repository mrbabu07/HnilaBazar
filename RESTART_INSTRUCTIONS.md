# 🔄 RESTART YOUR SERVER - Quick Instructions

## ⚠️ IMPORTANT: You MUST restart your server for the fixes to work!

---

## 🛑 Step 1: Stop Your Server

In the terminal where your server is running:

**Press:** `Ctrl + C`

You should see the server stop.

---

## ▶️ Step 2: Start Your Server

Run this command:

```bash
cd Server
node index.js
```

**OR if using nodemon:**

```bash
cd Server
nodemon index.js
```

---

## ✅ Step 3: Verify Success

Look for these messages in your console:

```
✅ Firebase Admin SDK initialized
✅ MongoDB connected successfully (HnilaBazar)
✅ Mongoose connected successfully  ← MUST SEE THIS!
🔧 Registering routes...
✅ Offers routes registered  ← MUST SEE THIS!
🔥 Server running on port 5000
```

---

## 🎯 Step 4: Test Offers

1. **Open browser** and go to: `http://localhost:5173/admin/offers`
2. **Click** "Create Offer" button
3. **Fill the form** and submit
4. **Should work!** ✅

---

## 🆘 If Server Won't Start

### Error: "Port 5000 already in use"

**Windows:**

```bash
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

Then start server again.

### Error: "Cannot find module 'mongoose'"

```bash
cd Server
npm install
```

Then start server again.

---

## 📝 Quick Reference

| Action                  | Command                         |
| ----------------------- | ------------------------------- |
| Stop Server             | `Ctrl + C`                      |
| Start Server            | `node index.js`                 |
| Start with Auto-restart | `nodemon index.js`              |
| Install Dependencies    | `npm install`                   |
| Check Port Usage        | `netstat -ano \| findstr :5000` |

---

## ✅ After Restart

Your offer system will be fully functional:

- Create offers ✅
- Upload images ✅
- Edit offers ✅
- Delete offers ✅
- Users see popups ✅

**Now restart your server and try creating an offer!** 🚀
