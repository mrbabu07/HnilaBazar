# 🚀 HnilaBazar - Quick Start Guide

Get up and running in 5 minutes!

---

## ⚡ Super Quick Start (Windows)

```bash
# 1. Install dependencies
cd Server && npm install
cd ../Client && npm install

# 2. Setup environment files
# Copy .env.example to .env in both folders and fill in your credentials

# 3. Seed database
cd Server
npm run seed

# 4. Start servers (open 2 terminals)
# Terminal 1 - Backend
cd Server
npm run dev

# Terminal 2 - Frontend
cd Client
npm run dev
```

**Done!** Visit http://localhost:5173

---

## 📋 Step-by-Step Guide

### 1️⃣ Prerequisites

Make sure you have:

- ✅ Node.js (v16+)
- ✅ MongoDB (local or Atlas)
- ✅ Firebase account

### 2️⃣ Clone & Install

```bash
# Clone repository
git clone <repository-url>
cd HnilaBazar

# Install server dependencies
cd Server
npm install

# Install client dependencies
cd ../Client
npm install
```

### 3️⃣ Configure Environment

**Server** (`Server/.env`):

```env
MONGO_URI=mongodb://localhost:27017/HnilaBazar
PORT=5000
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
```

**Client** (`Client/.env.local`):

```env
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abc123
```

### 4️⃣ Seed Database

**Option A: Windows Batch File** (Easiest)

```bash
cd Server
npm run seed
```

**Option B: Manual Commands**

```bash
cd Server
npm run seed        # Basic data (products, categories)
npm run seed:all    # Advanced features (flash sales, loyalty, etc.)
```

### 5️⃣ Start Development Servers

**Terminal 1 - Backend:**

```bash
cd Server
npm run dev
```

Server runs on: http://localhost:5000

**Terminal 2 - Frontend:**

```bash
cd Client
npm run dev
```

Client runs on: http://localhost:5173

### 6️⃣ Create Admin User

```bash
# Register a user in the frontend first, then:
cd Server
npm run make:admin your-email@example.com
```

---

## 🎯 Available Scripts

### Server Scripts

```bash
# Development
npm run dev              # Start with nodemon (auto-reload)
npm start                # Start production server

# Database
npm run seed             # Seed basic data
npm run seed:all         # Seed all features
npm run seed:flash       # Seed flash sales only

# Testing
npm run test:all         # Test all API endpoints
npm run test:flash       # Test flash sales API
npm run check:flash      # Check flash sale status

# Utilities
npm run make:admin       # Make user admin
```

### Client Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint
```

---

## 🌐 Access Points

After starting both servers:

### Customer Pages

- 🏠 Home: http://localhost:5173
- 🛍️ Products: http://localhost:5173/products
- 🔥 Flash Sales: http://localhost:5173/flash-sales
- 🎁 Loyalty: http://localhost:5173/loyalty
- 🔔 My Alerts: http://localhost:5173/my-alerts
- 🛒 Cart: http://localhost:5173/cart
- ❤️ Wishlist: http://localhost:5173/wishlist

### Admin Pages

- 📊 Dashboard: http://localhost:5173/admin
- 📦 Products: http://localhost:5173/admin/products
- 📋 Orders: http://localhost:5173/admin/orders
- ⚡ Flash Sales: http://localhost:5173/admin/flash-sales
- 📊 Inventory: http://localhost:5173/admin/inventory
- 👥 Users: http://localhost:5173/admin/users

### API Endpoints

- 🔌 API Base: http://localhost:5000/api
- 📚 API Docs: See README.md

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"

```bash
# Check if MongoDB is running
# For local MongoDB:
mongod

# For MongoDB Atlas:
# Check your connection string in .env
```

### "Port already in use"

```bash
# Change port in Server/.env
PORT=5001

# Or kill the process using the port
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### "Firebase authentication error"

```bash
# Check your Firebase credentials in:
# - Server/.env (Admin SDK)
# - Client/.env.local (Client SDK)
```

### "No products showing"

```bash
# Re-seed the database
cd Server
npm run seed
npm run seed:all
```

### "Flash sales expired"

```bash
# Create new flash sales
cd Server
npm run seed:flash
```

---

## 📚 Documentation

- **Main README**: [README.md](./README.md)
- **Folder Structure**: [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md)
- **Visual Structure**: [PROJECT_STRUCTURE_VISUAL.md](./PROJECT_STRUCTURE_VISUAL.md)
- **Reorganization**: [REORGANIZATION_SUMMARY.md](./REORGANIZATION_SUMMARY.md)
- **Scripts Guide**: [Server/scripts/README.md](./Server/scripts/README.md)

---

## 🎓 Learning Path

### For New Developers

1. **Read Documentation**
   - Start with README.md
   - Check FOLDER_STRUCTURE.md
   - Review API documentation

2. **Explore Codebase**
   - Frontend: `Client/src/`
   - Backend: `Server/`
   - Components: `Client/src/components/`
   - Pages: `Client/src/pages/`

3. **Run Tests**

   ```bash
   cd Server
   npm run test:all
   ```

4. **Make Changes**
   - Create a new branch
   - Make your changes
   - Test thoroughly
   - Submit PR

---

## 🔥 Pro Tips

1. **Use npm scripts** instead of direct node commands

   ```bash
   # ✅ Good
   npm run seed

   # ❌ Avoid
   node scripts/seed.js
   ```

2. **Check flash sales regularly**

   ```bash
   npm run check:flash
   ```

3. **Test before deploying**

   ```bash
   npm run test:all
   ```

4. **Keep documentation updated**
   - Update README when adding features
   - Document new scripts
   - Add comments to complex code

5. **Use environment variables**
   - Never commit .env files
   - Use .env.example as template
   - Keep secrets secure

---

## 🎉 You're Ready!

Your HnilaBazar e-commerce platform is now running!

**Next Steps:**

1. ✅ Explore the admin dashboard
2. ✅ Create some test orders
3. ✅ Try flash sales feature
4. ✅ Test loyalty program
5. ✅ Set up stock alerts

**Need Help?**

- Check documentation files
- Review code comments
- Test API endpoints
- Check console logs

---

**Happy Coding! 🚀**

---

**Last Updated**: January 29, 2026  
**Version**: 1.0.0
