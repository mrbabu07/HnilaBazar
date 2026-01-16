# 🔧 Troubleshooting Guide - HnilaBazar

Common issues and their solutions.

## Table of Contents

1. [Installation Issues](#installation-issues)
2. [Backend Issues](#backend-issues)
3. [Frontend Issues](#frontend-issues)
4. [Authentication Issues](#authentication-issues)
5. [Database Issues](#database-issues)
6. [Deployment Issues](#deployment-issues)

---

## Installation Issues

### npm install fails

**Problem:** Dependencies won't install

**Solutions:**

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install

# If still failing, try with legacy peer deps
npm install --legacy-peer-deps
```

### Port already in use

**Problem:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solutions:**

```bash
# Find process using port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9

# Or change port in Server/.env
PORT=5001
```

---

## Backend Issues

### MongoDB connection failed

**Problem:** `MongoServerError: bad auth`

**Solutions:**

1. Check username/password in connection string
2. Verify user has correct permissions in MongoDB Atlas
3. Check if IP is whitelisted in Network Access
4. Ensure database name is correct

**Problem:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solutions:**

1. Ensure MongoDB is running locally:

   ```bash
   # Mac
   brew services start mongodb-community

   # Windows
   net start MongoDB

   # Linux
   sudo systemctl start mongod
   ```

2. Or use MongoDB Atlas connection string

### Firebase Admin initialization failed

**Problem:** `Error: Failed to parse private key`

**Solutions:**

1. Ensure FIREBASE_PRIVATE_KEY has quotes:
   ```env
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```
2. Keep the `\n` characters (don't replace with actual newlines)
3. Verify all three Firebase env variables are set

### API returns 401 Unauthorized

**Problem:** Protected routes return 401

**Solutions:**

1. Check if user is logged in on frontend
2. Verify Firebase token is being sent:
   ```javascript
   // In api.js, check interceptor
   console.log("Token:", await user.getIdToken());
   ```
3. Check Firebase Admin SDK is initialized correctly
4. Verify token hasn't expired (refresh by logging out/in)

### CORS errors

**Problem:** `Access-Control-Allow-Origin` error

**Solutions:**

1. Add frontend URL to CORS whitelist in `Server/index.js`:
   ```javascript
   app.use(
     cors({
       origin: ["http://localhost:5173", "https://your-frontend.vercel.app"],
       credentials: true,
     })
   );
   ```
2. Ensure credentials are included in requests

---

## Frontend Issues

### Blank white screen

**Problem:** App shows blank page

**Solutions:**

1. Check browser console for errors
2. Verify all environment variables are set in `.env.local`
3. Check if API is running
4. Clear browser cache and reload
5. Check if routes are configured correctly

### Tailwind styles not working

**Problem:** CSS classes have no effect

**Solutions:**

1. Verify Tailwind is imported in `index.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
2. Check `tailwind.config.js` content paths:
   ```javascript
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"];
   ```
3. Restart dev server after config changes

### Images not loading

**Problem:** Product images show broken

**Solutions:**

1. Check image URLs are valid
2. Use placeholder service for testing:
   ```
   https://via.placeholder.com/400x400?text=Product
   ```
3. Verify CORS if loading from external sources
4. Check browser console for 404 errors

### React Router not working

**Problem:** Routes show 404 or don't navigate

**Solutions:**

1. Verify `RouterProvider` is used in `App.jsx`
2. Check route paths match Link `to` props
3. Ensure `MainLayout` has `<Outlet />`
4. For deployment, configure server redirects

---

## Authentication Issues

### Firebase auth not working

**Problem:** Login/Register fails silently

**Solutions:**

1. Check Firebase config in `.env.local`:
   ```bash
   # Verify all variables start with VITE_
   VITE_FIREBASE_API_KEY=...
   ```
2. Restart dev server after adding env variables
3. Check Firebase Console:
   - Authentication is enabled
   - Email/Password provider is enabled
   - Google provider is enabled (if using)
4. Check browser console for Firebase errors

### Google login fails

**Problem:** Google sign-in popup closes without logging in

**Solutions:**

1. Enable Google provider in Firebase Console
2. Add authorized domains in Firebase:
   - Go to Authentication → Settings → Authorized domains
   - Add `localhost` and your production domain
3. Check if popup is blocked by browser
4. Verify Firebase config is correct

### User stays logged in after logout

**Problem:** User data persists after logout

**Solutions:**

1. Clear localStorage:
   ```javascript
   localStorage.clear();
   ```
2. Clear browser cookies
3. Check if `signOut` is called correctly:
   ```javascript
   await signOut(auth);
   ```

### Admin features not showing

**Problem:** Admin dashboard not accessible

**Solutions:**

1. Verify user role in MongoDB:
   ```javascript
   db.users.findOne({ email: "your-email@example.com" });
   ```
2. Update role to "admin":
   ```javascript
   db.users.updateOne(
     { email: "your-email@example.com" },
     { $set: { role: "admin" } }
   );
   ```
3. Logout and login again
4. Check `isAdmin` in AuthContext
5. Clear browser cache

---

## Database Issues

### Seed script fails

**Problem:** `npm run seed` throws error

**Solutions:**

1. Ensure MongoDB is running
2. Check connection string in `.env`
3. Verify database name is correct
4. Check if collections already exist (script clears them)

### Products not showing

**Problem:** Product list is empty

**Solutions:**

1. Run seed script:
   ```bash
   cd Server
   npm run seed
   ```
2. Check MongoDB has data:
   ```javascript
   db.products.find();
   ```
3. Verify API endpoint returns data:
   ```
   http://localhost:5000/api/products
   ```
4. Check frontend API call in browser Network tab

### Orders not saving

**Problem:** Checkout completes but no order in database

**Solutions:**

1. Check browser console for errors
2. Verify user is authenticated
3. Check API endpoint in Network tab
4. Verify MongoDB connection
5. Check order controller for errors

---

## Deployment Issues

### Build fails

**Problem:** `npm run build` fails

**Solutions:**

1. Check for TypeScript errors (if using TS)
2. Fix ESLint errors:
   ```bash
   npm run lint
   ```
3. Ensure all imports are correct
4. Check for missing dependencies:
   ```bash
   npm install
   ```

### Environment variables not working in production

**Problem:** App works locally but not in production

**Solutions:**

1. Verify all env variables are set in deployment platform
2. For Vite, ensure variables start with `VITE_`
3. Rebuild after adding env variables
4. Check deployment logs for errors

### API calls fail in production

**Problem:** Frontend can't reach backend

**Solutions:**

1. Verify `VITE_API_URL` points to production backend
2. Check CORS configuration includes production frontend URL
3. Ensure backend is deployed and running
4. Check if HTTPS is required
5. Verify API endpoints in browser Network tab

### Firebase auth fails in production

**Problem:** Authentication works locally but not in production

**Solutions:**

1. Add production domain to Firebase authorized domains
2. Verify Firebase config in production env variables
3. Check if API keys are correct
4. Ensure HTTPS is enabled

---

## General Debugging Tips

### Enable Debug Mode

**Frontend:**

```javascript
// Add to components
console.log("State:", { user, cart, products });
```

**Backend:**

```javascript
// Add to routes
console.log("Request:", req.body);
console.log("User:", req.user);
```

### Check API Responses

Use browser DevTools Network tab:

1. Open DevTools (F12)
2. Go to Network tab
3. Filter by XHR/Fetch
4. Click on request to see details
5. Check Status, Headers, Response

### Verify Environment Variables

**Frontend:**

```javascript
// Add to App.jsx temporarily
console.log("API URL:", import.meta.env.VITE_API_URL);
```

**Backend:**

```javascript
// Add to index.js
console.log("MongoDB URI:", process.env.MONGO_URI ? "Set" : "Not set");
```

### Clear Everything

When all else fails:

```bash
# Frontend
cd Client
rm -rf node_modules package-lock.json dist
npm install
npm run dev

# Backend
cd Server
rm -rf node_modules package-lock.json
npm install
npm run dev

# Browser
# Clear cache, cookies, localStorage
# Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
```

---

## Getting Help

### Before Asking for Help

1. Check this troubleshooting guide
2. Read error messages carefully
3. Check browser console
4. Check server logs
5. Search for error message online
6. Try the solution in a clean environment

### When Asking for Help

Include:

1. What you're trying to do
2. What you expected to happen
3. What actually happened
4. Error messages (full text)
5. Your environment (OS, Node version, etc.)
6. Steps to reproduce
7. What you've already tried

### Useful Commands

```bash
# Check Node version
node --version

# Check npm version
npm --version

# Check if port is in use
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # Mac/Linux

# Check MongoDB status
mongosh  # Try to connect

# View logs
# Railway: Check dashboard
# Vercel: Check deployment logs
# Local: Check terminal output
```

---

## Still Having Issues?

1. Review the [README.md](README.md) for setup instructions
2. Check [QUICKSTART.md](QUICKSTART.md) for step-by-step guide
3. Review [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) to understand the architecture
4. Check official documentation:
   - [React](https://react.dev/)
   - [Vite](https://vitejs.dev/)
   - [Express](https://expressjs.com/)
   - [MongoDB](https://www.mongodb.com/docs/)
   - [Firebase](https://firebase.google.com/docs)

Remember: Most issues are related to environment variables, authentication, or database connections. Double-check these first!
