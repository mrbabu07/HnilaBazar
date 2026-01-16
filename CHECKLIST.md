# ✅ HnilaBazar Setup Checklist

Use this checklist to ensure everything is configured correctly.

## 📋 Pre-Setup Checklist

- [ ] Node.js v16+ installed
- [ ] npm or yarn installed
- [ ] MongoDB installed locally OR MongoDB Atlas account created
- [ ] Firebase account created
- [ ] Code editor installed (VS Code recommended)
- [ ] Git installed (optional, for version control)

---

## 🔥 Firebase Setup Checklist

### Create Project

- [ ] Firebase project created
- [ ] Project name set (e.g., "HnilaBazar")
- [ ] Google Analytics disabled (optional)

### Authentication Setup

- [ ] Authentication enabled in Firebase Console
- [ ] Email/Password sign-in method enabled
- [ ] Google sign-in method enabled
- [ ] Authorized domains configured (localhost, production domain)

### Get Credentials

- [ ] Firebase web config copied (from Project Settings)
- [ ] Service account JSON downloaded (from Service Accounts tab)
- [ ] All Firebase credentials saved securely

---

## 🗄️ Database Setup Checklist

### Local MongoDB

- [ ] MongoDB installed
- [ ] MongoDB service running
- [ ] Can connect via `mongosh` or Compass

### MongoDB Atlas (Alternative)

- [ ] MongoDB Atlas account created
- [ ] Free cluster created (M0)
- [ ] Database user created with password
- [ ] Network access configured (0.0.0.0/0 for development)
- [ ] Connection string copied

---

## 🖥️ Backend Setup Checklist

### Installation

- [ ] Navigated to `Server` directory
- [ ] Ran `npm install`
- [ ] All dependencies installed successfully
- [ ] No error messages

### Environment Variables

- [ ] `.env` file created in `Server` directory
- [ ] `PORT` set (default: 5000)
- [ ] `MONGO_URI` set with correct connection string
- [ ] `FIREBASE_PROJECT_ID` set
- [ ] `FIREBASE_CLIENT_EMAIL` set
- [ ] `FIREBASE_PRIVATE_KEY` set (with quotes and \n preserved)

### Database Seeding

- [ ] Ran `npm run seed`
- [ ] Categories inserted successfully
- [ ] Products inserted successfully
- [ ] No error messages

### Server Start

- [ ] Ran `npm run dev`
- [ ] Server started on correct port
- [ ] MongoDB connected successfully
- [ ] No error messages
- [ ] Can access http://localhost:5000

---

## 💻 Frontend Setup Checklist

### Installation

- [ ] Navigated to `Client` directory
- [ ] Ran `npm install`
- [ ] All dependencies installed successfully
- [ ] No error messages

### Environment Variables

- [ ] `.env.local` file created in `Client` directory
- [ ] `VITE_API_URL` set (http://localhost:5000/api)
- [ ] `VITE_FIREBASE_API_KEY` set
- [ ] `VITE_FIREBASE_AUTH_DOMAIN` set
- [ ] `VITE_FIREBASE_PROJECT_ID` set
- [ ] `VITE_FIREBASE_STORAGE_BUCKET` set
- [ ] `VITE_FIREBASE_MESSAGING_SENDER_ID` set
- [ ] `VITE_FIREBASE_APP_ID` set

### Development Server

- [ ] Ran `npm run dev`
- [ ] Server started on port 5173 (or similar)
- [ ] No error messages
- [ ] Can access http://localhost:5173
- [ ] Homepage loads correctly

---

## 🧪 Testing Checklist

### Public Features

- [ ] Homepage loads with hero section
- [ ] Categories display correctly
- [ ] Featured products show (8 products)
- [ ] Can click on category links
- [ ] Category pages show filtered products
- [ ] Can view product details
- [ ] Can add products to cart
- [ ] Cart icon shows correct count
- [ ] Cart page displays items
- [ ] Can update quantities in cart
- [ ] Can remove items from cart

### Authentication

- [ ] Can access register page
- [ ] Can register with email/password
- [ ] Registration validation works
- [ ] Can login with email/password
- [ ] Can login with Google
- [ ] User stays logged in after refresh
- [ ] Can logout successfully
- [ ] Redirects work correctly

### User Features (After Login)

- [ ] Can access checkout page
- [ ] Checkout form validation works
- [ ] Can place an order
- [ ] Order appears in order history
- [ ] Cart clears after order
- [ ] Can view profile page
- [ ] Profile shows correct user info

### Admin Features (After Setting Admin Role)

- [ ] Admin dashboard accessible
- [ ] Can view all products
- [ ] Can add new product
- [ ] Can edit existing product
- [ ] Can delete product
- [ ] Can view all categories
- [ ] Can add new category
- [ ] Can delete category
- [ ] Can view all orders
- [ ] Can update order status

---

## 🎨 UI/UX Checklist

### Responsive Design

- [ ] Works on mobile (< 640px)
- [ ] Works on tablet (640px - 1024px)
- [ ] Works on desktop (> 1024px)
- [ ] Navigation adapts to screen size
- [ ] Images scale properly
- [ ] Text is readable on all devices

### Visual Elements

- [ ] Colors match design (primary, secondary, accent)
- [ ] Buttons have hover effects
- [ ] Cards have shadow effects
- [ ] Loading states show correctly
- [ ] Error messages display properly
- [ ] Success messages show when needed

### User Experience

- [ ] Navigation is intuitive
- [ ] Forms are easy to fill
- [ ] Feedback is immediate
- [ ] No broken links
- [ ] No console errors
- [ ] Page loads are fast

---

## 🔒 Security Checklist

### Environment Variables

- [ ] No secrets in code
- [ ] `.env` files in `.gitignore`
- [ ] `.env.local` not committed
- [ ] All sensitive data in env files

### Authentication

- [ ] Firebase tokens verified on backend
- [ ] Protected routes work correctly
- [ ] Admin routes check role
- [ ] Unauthorized access blocked

### API Security

- [ ] CORS configured correctly
- [ ] Input validation on backend
- [ ] Error messages don't expose sensitive info
- [ ] MongoDB connection string secure

---

## 📦 Deployment Checklist

### Pre-Deployment

- [ ] All features tested locally
- [ ] No console errors
- [ ] No console warnings (or acceptable)
- [ ] Environment variables documented
- [ ] README updated with deployment info

### Backend Deployment

- [ ] MongoDB Atlas configured
- [ ] Backend deployed (Railway/Render/Heroku)
- [ ] Environment variables set in platform
- [ ] Database seeded in production
- [ ] API accessible via HTTPS
- [ ] Health check endpoint works

### Frontend Deployment

- [ ] Frontend built successfully (`npm run build`)
- [ ] Deployed to Vercel/Netlify
- [ ] Environment variables set in platform
- [ ] API URL points to production backend
- [ ] Site accessible via HTTPS
- [ ] All pages load correctly

### Post-Deployment

- [ ] Firebase authorized domains updated
- [ ] CORS includes production URLs
- [ ] Test all features in production
- [ ] Create admin user in production
- [ ] Monitor for errors
- [ ] Check performance

---

## 📚 Documentation Checklist

### Files Present

- [ ] README.md (main documentation)
- [ ] QUICKSTART.md (setup guide)
- [ ] DEPLOYMENT.md (deployment guide)
- [ ] TROUBLESHOOTING.md (common issues)
- [ ] PROJECT_STRUCTURE.md (architecture)
- [ ] FEATURES.md (feature list)
- [ ] CHECKLIST.md (this file)

### Content Quality

- [ ] Instructions are clear
- [ ] Examples are provided
- [ ] Common issues documented
- [ ] Contact info included (if applicable)

---

## 🐛 Troubleshooting Checklist

If something doesn't work:

- [ ] Checked browser console for errors
- [ ] Checked server terminal for errors
- [ ] Verified all environment variables
- [ ] Restarted both servers
- [ ] Cleared browser cache
- [ ] Checked MongoDB connection
- [ ] Verified Firebase configuration
- [ ] Reviewed TROUBLESHOOTING.md
- [ ] Searched error message online
- [ ] Tried in incognito/private mode

---

## 🎯 Final Verification

### Functionality

- [ ] All public features work
- [ ] All user features work
- [ ] All admin features work
- [ ] No critical bugs
- [ ] Performance is acceptable

### Code Quality

- [ ] Code is clean and readable
- [ ] No unused imports
- [ ] No console.logs in production code
- [ ] Proper error handling
- [ ] Comments where needed

### Production Ready

- [ ] Environment variables configured
- [ ] Security measures in place
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] User feedback provided

---

## 🎉 Success Criteria

You're ready to go when:

✅ Backend server runs without errors
✅ Frontend loads and displays correctly
✅ Can register and login
✅ Can browse and add products to cart
✅ Can complete checkout
✅ Admin can manage products and orders
✅ All features work as expected
✅ No critical errors in console
✅ Application is responsive
✅ Ready for deployment or further development

---

## 📝 Notes

- Keep this checklist handy during setup
- Check off items as you complete them
- If stuck, refer to TROUBLESHOOTING.md
- For detailed steps, see QUICKSTART.md
- For deployment, see DEPLOYMENT.md

**Estimated Setup Time:** 15-30 minutes (with all prerequisites ready)

---

Happy building! 🚀
