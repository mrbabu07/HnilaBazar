# 🔧 Troubleshooting Guide

## Current Errors Explained

### ❌ ERR_CONNECTION_REFUSED (Most Important!)

**Error:**

```
Failed to load resource: net::ERR_CONNECTION_REFUSED
localhost:5000/api/categories
localhost:5000/api/products
localhost:5000/api/user/me
```

**Cause:** Backend server is not running

**Solution:**

```bash
# Open a new terminal
cd Server
npm start

# Wait for: "🚀 Server is running on port 5000"
```

---

### ✅ TawkTo Error (Fixed!)

**Error:**

```
TawkToChat.jsx:17 Uncaught TypeError: window.Tawk_API.setAttributes is not a function
```

**Cause:** Tawk API not fully loaded when trying to call setAttributes

**Solution:** ✅ Already fixed! Added safety checks:

- Check if `window.Tawk_API` exists
- Check if `setAttributes` is a function
- Wrapped in try-catch for extra safety

---

## How to Run the Application

### Step 1: Start Backend Server

**Terminal 1 (Backend):**

```bash
cd Server
npm start
```

**Expected Output:**

```
✅ MongoDB connected successfully
✅ Products routes registered
✅ Categories routes registered
... (more routes)
✅ Delivery Settings routes registered
🚀 Server is running on port 5000
```

### Step 2: Start Frontend (If Not Running)

**Terminal 2 (Frontend):**

```bash
cd Client
npm run dev
```

**Expected Output:**

```
VITE v5.x.x ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Step 3: Open Browser

Navigate to: `http://localhost:5173`

---

## Verification Checklist

### ✅ Backend Running

- [ ] Terminal shows "Server is running on port 5000"
- [ ] No errors in server terminal
- [ ] MongoDB connected successfully
- [ ] All routes registered

### ✅ Frontend Running

- [ ] Terminal shows "Local: http://localhost:5173"
- [ ] Browser opens automatically or manually navigate
- [ ] No ERR_CONNECTION_REFUSED errors in console

### ✅ Application Working

- [ ] Home page loads
- [ ] Products display
- [ ] Categories show in navbar
- [ ] No red errors in browser console
- [ ] Can navigate between pages

---

## Common Issues & Solutions

### Issue 1: Port 5000 Already in Use

**Error:**

```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution A - Kill Process:**

```bash
# Windows CMD
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force
```

**Solution B - Change Port:**

```env
# Server/.env
PORT=5001
```

Then update frontend API URL:

```env
# Client/.env.local
VITE_API_URL=http://localhost:5001
```

---

### Issue 2: MongoDB Connection Failed

**Error:**

```
❌ MongoDB connection failed
```

**Solution:**

1. Check `Server/.env` has valid MongoDB URI
2. Ensure MongoDB is running (if local)
3. Check internet connection (if using MongoDB Atlas)
4. Verify credentials are correct

```env
# Server/.env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
```

---

### Issue 3: Missing Dependencies

**Error:**

```
Cannot find module 'express'
Cannot find module 'mongoose'
```

**Solution:**

```bash
# Backend
cd Server
npm install

# Frontend
cd Client
npm install
```

---

### Issue 4: CORS Errors

**Error:**

```
Access to fetch at 'http://localhost:5000/api/...' from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solution:**
Already configured in `Server/index.js`:

```javascript
app.use(cors());
```

If still having issues, try:

```javascript
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
```

---

### Issue 5: Environment Variables Not Loading

**Error:**

```
undefined for process.env.MONGODB_URI
```

**Solution:**

1. Ensure `.env` file exists in Server folder
2. Check file is named exactly `.env` (not `.env.txt`)
3. Restart server after changing `.env`
4. Verify `require('dotenv').config()` is at top of `Server/index.js`

---

## Development Workflow

### Daily Startup

```bash
# Terminal 1 - Backend
cd Server
npm start

# Terminal 2 - Frontend
cd Client
npm run dev

# Browser
# Navigate to http://localhost:5173
```

### Making Changes

**Backend Changes:**

- Edit files in `Server/` folder
- Server auto-restarts (if using nodemon)
- Or manually restart: Ctrl+C then `npm start`

**Frontend Changes:**

- Edit files in `Client/` folder
- Vite auto-reloads browser
- No restart needed

---

## Quick Fixes

### Clear Everything and Restart

```bash
# Stop both servers (Ctrl+C in both terminals)

# Backend
cd Server
rm -rf node_modules
npm install
npm start

# Frontend
cd Client
rm -rf node_modules
npm install
npm run dev
```

### Reset Database (If Needed)

```bash
cd Server
node scripts/seedAll.js
```

---

## Performance Tips

### Reduce Console Errors

1. **Disable TawkTo** (if not needed):
   - Remove `<TawkToChat />` from `MainLayout.jsx`

2. **Reduce API Calls**:
   - Components fetch data on mount
   - Use React Query for caching (future enhancement)

3. **Clear Browser Cache**:
   - Hard refresh: Ctrl+Shift+R (Windows)
   - Or clear cache in DevTools

---

## Getting Help

### Check Logs

**Backend Logs:**

- Look at Terminal 1 (Server terminal)
- Check for error messages
- MongoDB connection status

**Frontend Logs:**

- Open Browser DevTools (F12)
- Check Console tab
- Check Network tab for failed requests

### Debug Mode

**Backend:**

```bash
cd Server
DEBUG=* npm start
```

**Frontend:**
Already in dev mode with detailed errors

---

## Status Indicators

### ✅ Everything Working

```
Backend: 🚀 Server is running on port 5000
Frontend: ➜ Local: http://localhost:5173/
Browser: No red errors in console
```

### ❌ Backend Not Running

```
Browser Console: ERR_CONNECTION_REFUSED on localhost:5000
Solution: Start backend server
```

### ❌ Frontend Not Running

```
Browser: Cannot connect to localhost:5173
Solution: Start frontend dev server
```

---

## Summary

**Most Common Issue:** Backend server not running

**Quick Fix:**

```bash
cd Server
npm start
```

**Both Should Be Running:**

- Terminal 1: Backend on port 5000
- Terminal 2: Frontend on port 5173
- Browser: http://localhost:5173

---

**Need More Help?**

1. Check both terminals for error messages
2. Verify `.env` files are configured
3. Ensure MongoDB is accessible
4. Try restarting both servers
5. Clear browser cache and refresh
