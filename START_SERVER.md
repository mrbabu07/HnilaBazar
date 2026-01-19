# 🚀 Quick Start Guide

## Start Backend Server

### Option 1: Using Node

```bash
cd Server
node index.js
```

### Option 2: Using Nodemon (Auto-restart on changes)

```bash
cd Server
nodemon index.js
```

### Option 3: Using npm script (if configured)

```bash
cd Server
npm start
```

---

## Start Frontend Client

Open a **new terminal** and run:

```bash
cd Client
npm run dev
```

---

## Expected Output

### Backend Console:

```
✅ Firebase Admin SDK initialized
✅ MongoDB connected successfully (HnilaBazar)
🔧 Registering routes...
✅ Products routes registered
✅ Categories routes registered
✅ Orders routes registered
✅ User routes registered
✅ Wishlist routes registered
✅ Reviews routes registered
✅ Coupons routes registered
✅ Addresses routes registered
✅ Returns routes registered
✅ Payments routes registered
✅ Offers routes registered  ← IMPORTANT!
🔥 Server running on port 5000
```

### Frontend Console:

```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

---

## Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Admin Dashboard**: http://localhost:5173/admin
- **Offers Management**: http://localhost:5173/admin/offers

---

## Troubleshooting

### Port Already in Use

If you get "Port 5000 already in use":

**Windows:**

```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Mac/Linux:**

```bash
lsof -ti:5000 | xargs kill -9
```

### MongoDB Connection Error

- Check your `MONGO_URI` in `Server/.env`
- Ensure MongoDB is running (if local)
- Check network connection (if cloud)

### Firebase Error

- Verify `Server/.env` has correct Firebase credentials
- See `BACKEND_FIREBASE_SETUP.md` for setup instructions

---

## Quick Commands Reference

```bash
# Install dependencies (first time only)
cd Server && npm install
cd Client && npm install

# Start both servers (use 2 terminals)
Terminal 1: cd Server && node index.js
Terminal 2: cd Client && npm run dev

# Stop servers
Press Ctrl + C in each terminal
```
