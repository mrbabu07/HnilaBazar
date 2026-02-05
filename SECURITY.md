# 🔐 Security Guide

## ⚠️ CRITICAL: Before Pushing to Git

### 1. Check for Secrets

```bash
# Check if any .env files are tracked
git ls-files | findstr "\.env"

# Should ONLY show:
# Client/.env.example
# Server/.env.example

# If you see .env or .env.local, they are NOT properly ignored!
```

### 2. Verify .gitignore

Ensure these files are in `.gitignore`:

- ✅ `.env`
- ✅ `.env.local`
- ✅ `Server/.env`
- ✅ `Client/.env.local`
- ✅ `firebase-adminsdk-*.json`
- ✅ `*.pem`, `*.key`

### 3. Check Staged Files

```bash
# See what will be committed
git status

# If you see any .env files, STOP!
git reset HEAD Server/.env
git reset HEAD Client/.env.local
```

---

## 🚨 If You Accidentally Committed Secrets

### Option 1: Remove from Last Commit (Not Pushed Yet)

```bash
# Remove file from commit but keep locally
git reset HEAD~1 Server/.env
git reset HEAD~1 Client/.env.local

# Commit again without secrets
git add .
git commit -m "Your message"
```

### Option 2: Already Pushed to GitHub

**⚠️ CRITICAL: You MUST rotate all secrets immediately!**

1. **Change ALL passwords and keys:**
   - MongoDB password
   - Firebase private key (regenerate)
   - SMTP password
   - API keys (ImgBB, etc.)
   - VAPID keys

2. **Remove from Git history:**

```bash
# Install BFG Repo Cleaner
# Download from: https://rtyley.github.io/bfg-repo-cleaner/

# Remove .env files from history
bfg --delete-files .env
bfg --delete-files .env.local

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push (⚠️ WARNING: Rewrites history)
git push --force
```

3. **Update GitHub:**
   - Go to repository settings
   - Check "Security" tab
   - Review any exposed secrets
   - Rotate all credentials

---

## ✅ Security Checklist

### Environment Variables

- [ ] `.env` files are in `.gitignore`
- [ ] `.env.example` files have NO real values
- [ ] All secrets use environment variables
- [ ] No hardcoded credentials in code

### Firebase

- [ ] Firebase Admin SDK key is in `.env`
- [ ] Firebase client config uses environment variables
- [ ] `firebase-adminsdk-*.json` is in `.gitignore`
- [ ] Firebase rules are properly configured

### MongoDB

- [ ] Connection string is in `.env`
- [ ] Database password is strong
- [ ] IP whitelist configured (if using Atlas)
- [ ] Database user has minimal required permissions

### API Keys

- [ ] ImgBB API key is in `.env`
- [ ] VAPID keys are in `.env`
- [ ] No API keys in client-side code
- [ ] API keys have usage limits set

### Email (SMTP)

- [ ] SMTP credentials are in `.env`
- [ ] Using app-specific password (not main password)
- [ ] Email rate limiting configured

### Code Security

- [ ] No `console.log` with sensitive data
- [ ] No commented-out credentials
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (using Mongoose)
- [ ] XSS prevention (React handles this)
- [ ] CSRF protection (if needed)

---

## 📋 .env File Security

### Server/.env

**✅ SECURE (Using environment variables):**

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
SMTP_PASS=your-app-password
```

**❌ INSECURE (Hardcoded in code):**

```javascript
// DON'T DO THIS!
const mongoUri = "mongodb+srv://user:pass@cluster.mongodb.net/db";
const firebaseKey = "-----BEGIN PRIVATE KEY-----...";
```

### Client/.env.local

**✅ SECURE:**

```env
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=AIzaSy...
```

**Note:** Client-side env vars are public! Don't put secrets here.

---

## 🔒 Production Security

### Hosting Platform (Railway/Render/Heroku)

1. **Set environment variables in dashboard**
   - Never commit production .env
   - Use platform's secret management
   - Enable automatic deployments

2. **Enable HTTPS**
   - Force SSL/TLS
   - Use HSTS headers
   - Redirect HTTP to HTTPS

3. **Set up monitoring**
   - Error tracking (Sentry)
   - Uptime monitoring
   - Security alerts

### MongoDB Atlas

1. **Network Access**
   - Whitelist specific IPs (not 0.0.0.0/0 in production)
   - Use VPC peering if possible
   - Enable audit logs

2. **Database Access**
   - Create separate users for dev/prod
   - Use strong passwords (20+ characters)
   - Limit user permissions
   - Enable 2FA on Atlas account

3. **Backup**
   - Enable automatic backups
   - Test restore process
   - Keep backups encrypted

### Firebase

1. **Authentication**
   - Enable only needed providers
   - Set up email verification
   - Configure password requirements
   - Enable 2FA for admin accounts

2. **Firestore Rules**
   - Never use `allow read, write: if true;`
   - Validate all data
   - Use authentication checks
   - Test rules thoroughly

3. **Security Rules**

   ```javascript
   // Good
   allow read: if request.auth != null;
   allow write: if request.auth.uid == userId;

   // Bad
   allow read, write: if true;
   ```

---

## 🛡️ Additional Security Measures

### Rate Limiting

Add to `Server/index.js`:

```javascript
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use("/api/", limiter);
```

### Helmet (Security Headers)

```javascript
const helmet = require("helmet");
app.use(helmet());
```

### Input Validation

```javascript
// Use express-validator
const { body, validationResult } = require("express-validator");

app.post(
  "/api/orders",
  body("email").isEmail(),
  body("phone").isMobilePhone(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Process order
  },
);
```

### CORS Configuration

```javascript
const cors = require("cors");

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
```

---

## 📞 Security Contacts

**If you discover a security vulnerability:**

1. **DO NOT** create a public GitHub issue
2. Email: mdjahedulislamjaved@gmail.com
3. Include:
   - Description of vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

**Response time:** Within 48 hours

---

## 🔍 Regular Security Audits

### Monthly Checks

- [ ] Review access logs
- [ ] Check for failed login attempts
- [ ] Update dependencies (`npm audit`)
- [ ] Review API usage
- [ ] Check for exposed secrets (GitHub secret scanning)

### Quarterly Checks

- [ ] Rotate API keys
- [ ] Review user permissions
- [ ] Update security policies
- [ ] Penetration testing
- [ ] Backup verification

---

## 📚 Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [MongoDB Security Checklist](https://docs.mongodb.com/manual/administration/security-checklist/)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)

---

## ✅ Pre-Push Security Verification

Run this before every push:

```bash
# 1. Check for secrets
git diff --cached | findstr -i "password\|secret\|key\|token"

# 2. Verify .env files are ignored
git status | findstr "\.env"

# 3. Check for large files (might be dumps)
git diff --cached --stat

# 4. Run security audit
npm audit

# 5. If all clear, push
git push origin main
```

---

**Last Updated:** February 5, 2026  
**Version:** 1.0.0  
**Status:** Active ✅
