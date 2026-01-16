# 🚀 Deployment Guide - HnilaBazar

Complete guide to deploy your e-commerce platform to production.

## Overview

We'll deploy:

- **Backend** → Railway/Render (free tier available)
- **Frontend** → Vercel (free tier available)
- **Database** → MongoDB Atlas (free tier available)

## Part 1: MongoDB Atlas Setup

### 1. Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create a new cluster (M0 Free tier)

### 2. Configure Database Access

1. Go to **Database Access**
2. Add new database user
3. Choose password authentication
4. Save username and password securely

### 3. Configure Network Access

1. Go to **Network Access**
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0)
4. Confirm

### 4. Get Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `HnilaBazar`

Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/HnilaBazar?retryWrites=true&w=majority`

## Part 2: Backend Deployment (Railway)

### 1. Prepare Backend

1. Ensure `Server/package.json` has start script:

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js",
  "seed": "node seed.js"
}
```

2. Create `Server/.gitignore` if not exists:

```
node_modules
.env
```

### 2. Deploy to Railway

1. Go to [Railway.app](https://railway.app/)
2. Sign up with GitHub
3. Click "New Project"
4. Choose "Deploy from GitHub repo"
5. Select your repository
6. Choose the `Server` directory as root

### 3. Configure Environment Variables

In Railway dashboard, add these variables:

```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key
```

### 4. Deploy

1. Railway will automatically deploy
2. Copy your deployment URL (e.g., `https://your-app.railway.app`)
3. Test: Visit `https://your-app.railway.app/` - should see API message

### 5. Seed Production Database

```bash
# Set environment variables locally to point to production
MONGO_URI=your_production_mongodb_uri npm run seed
```

## Part 3: Frontend Deployment (Vercel)

### 1. Prepare Frontend

1. Update `Client/vite.config.js` if needed:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
});
```

2. Create `Client/.gitignore`:

```
node_modules
dist
.env.local
.env
```

### 2. Deploy to Vercel

1. Go to [Vercel](https://vercel.com/)
2. Sign up with GitHub
3. Click "Add New Project"
4. Import your repository
5. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** Client
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### 3. Configure Environment Variables

In Vercel dashboard, add these variables:

```
VITE_API_URL=https://your-backend.railway.app/api
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Deploy

1. Click "Deploy"
2. Wait for deployment to complete
3. Visit your live site!

## Part 4: Post-Deployment Setup

### 1. Update Firebase Configuration

1. Go to Firebase Console
2. Add your Vercel domain to authorized domains:
   - **Authentication** → **Settings** → **Authorized domains**
   - Add: `your-app.vercel.app`

### 2. Update CORS (if needed)

If you face CORS issues, update `Server/index.js`:

```javascript
app.use(
  cors({
    origin: ["https://your-app.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);
```

### 3. Create Admin User

1. Register through your live site
2. Connect to MongoDB Atlas
3. Update user role to "admin"

## Alternative Deployment Options

### Backend Alternatives

#### Render

1. Go to [Render](https://render.com/)
2. Create new Web Service
3. Connect GitHub repo
4. Configure:
   - **Root Directory:** Server
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add environment variables

#### Heroku

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set buildpack: `heroku buildpacks:set heroku/nodejs`
5. Set env vars: `heroku config:set KEY=value`
6. Deploy: `git push heroku main`

### Frontend Alternatives

#### Netlify

1. Go to [Netlify](https://www.netlify.com/)
2. Drag and drop your `dist` folder
3. Or connect GitHub for continuous deployment
4. Configure environment variables
5. Set build command: `npm run build`
6. Set publish directory: `dist`

## Monitoring & Maintenance

### 1. Monitor Application

- Railway/Render: Check logs in dashboard
- Vercel: Check deployment logs
- MongoDB Atlas: Monitor database performance

### 2. Set Up Alerts

- MongoDB Atlas: Set up alerts for high usage
- Railway/Render: Monitor resource usage

### 3. Backup Database

- MongoDB Atlas: Enable automated backups
- Or use `mongodump` for manual backups

## Security Checklist

- [ ] All environment variables are set correctly
- [ ] No secrets in code or version control
- [ ] Firebase authorized domains configured
- [ ] MongoDB network access configured
- [ ] HTTPS enabled (automatic with Vercel/Railway)
- [ ] CORS configured properly
- [ ] Rate limiting implemented (optional)

## Performance Optimization

### Backend

- Enable compression middleware
- Add caching for frequently accessed data
- Optimize database queries
- Use connection pooling

### Frontend

- Lazy load routes
- Optimize images
- Enable code splitting
- Use CDN for static assets

## Troubleshooting

### "Cannot connect to database"

- Check MongoDB Atlas connection string
- Verify network access settings
- Ensure database user has correct permissions

### "CORS error"

- Add frontend URL to CORS whitelist
- Check if credentials are enabled

### "Firebase auth not working"

- Verify authorized domains in Firebase
- Check environment variables
- Ensure Firebase config is correct

### "Build failed"

- Check build logs
- Verify all dependencies are in package.json
- Test build locally: `npm run build`

## Cost Estimation

### Free Tier Limits

- **MongoDB Atlas:** 512 MB storage
- **Railway:** 500 hours/month, $5 credit
- **Vercel:** Unlimited deployments, 100 GB bandwidth
- **Firebase:** 10K auth users, 50K reads/day

### Scaling Costs

When you exceed free tier:

- **MongoDB Atlas:** ~$9/month (M10 cluster)
- **Railway:** ~$5-20/month
- **Vercel:** ~$20/month (Pro plan)
- **Firebase:** Pay as you go

## Next Steps

1. **Custom Domain:** Add your own domain
2. **SSL Certificate:** Automatic with Vercel/Railway
3. **Analytics:** Add Google Analytics
4. **Error Tracking:** Integrate Sentry
5. **Email Service:** Add SendGrid/Mailgun
6. **Payment Gateway:** Integrate Stripe

## Support

If you encounter issues:

1. Check deployment logs
2. Verify environment variables
3. Test locally first
4. Check service status pages
5. Review documentation

---

Congratulations! Your e-commerce platform is now live! 🎉
