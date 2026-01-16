# 🔒 Git Security Guide - Keep Your Secrets Safe!

## ✅ What's Protected

Your sensitive data is now protected from being pushed to Git:

### Server Secrets (Server/.env)

- ❌ MongoDB connection string (contains password)
- ❌ Firebase Admin SDK credentials
- ❌ Firebase private key

### Client Secrets (Client/.env.local)

- ❌ Firebase API keys
- ❌ Firebase configuration

### Files Ignored

- ✅ `.env` files
- ✅ `.env.local` files
- ✅ `node_modules/`
- ✅ Firebase service account JSON files
- ✅ Build outputs

---

## 🚀 Before Pushing to Git

### Step 1: Verify .gitignore is Working

Run this command to check what will be committed:

```bash
git status
```

**You should NOT see:**

- ❌ `Server/.env`
- ❌ `Client/.env.local`
- ❌ Any `*-firebase-adminsdk-*.json` files
- ❌ `node_modules/` folders

**You SHOULD see:**

- ✅ `Server/.env.example`
- ✅ `Client/.env.example`
- ✅ `.gitignore` files
- ✅ Source code files

### Step 2: Check for Accidentally Committed Secrets

```bash
git log --all --full-history -- "**/.env"
```

If this shows any results, secrets were committed before. See "Remove Secrets from History" below.

---

## 📝 Safe Git Workflow

### Initial Commit

```bash
# 1. Initialize git (if not already done)
git init

# 2. Add all files (secrets are automatically ignored)
git add .

# 3. Check what will be committed
git status

# 4. Commit
git commit -m "Initial commit: HnilaBazar e-commerce platform"

# 5. Add remote repository
git remote add origin https://github.com/yourusername/hnilabazar.git

# 6. Push to GitHub
git push -u origin main
```

### Regular Updates

```bash
# 1. Check status
git status

# 2. Add changes
git add .

# 3. Commit with message
git commit -m "Add feature: product filtering"

# 4. Push
git push
```

---

## 🔍 Verify Secrets Are Not in Repository

### Check Local Files

```bash
# This should return nothing (secrets are ignored)
git ls-files | grep .env
```

### Check on GitHub

After pushing, go to your GitHub repository and verify:

- ❌ No `.env` files visible
- ❌ No MongoDB connection strings
- ❌ No Firebase private keys
- ✅ Only `.env.example` files visible

---

## 🆘 If You Accidentally Committed Secrets

### Option 1: Remove from Last Commit (Before Pushing)

```bash
# Remove the file from git but keep it locally
git rm --cached Server/.env
git rm --cached Client/.env.local

# Commit the removal
git commit --amend -m "Remove sensitive files"
```

### Option 2: Remove from History (After Pushing)

**⚠️ WARNING: This rewrites history!**

```bash
# Install git-filter-repo (if not installed)
# pip install git-filter-repo

# Remove file from entire history
git filter-repo --path Server/.env --invert-paths
git filter-repo --path Client/.env.local --invert-paths

# Force push (⚠️ dangerous - only if you're the only contributor)
git push origin --force --all
```

### Option 3: Rotate All Secrets (Recommended if pushed)

If secrets were pushed to a public repository:

1. **MongoDB:**

   - Change MongoDB password in Atlas
   - Update `Server/.env` with new connection string

2. **Firebase:**

   - Generate new Firebase Admin SDK key
   - Update `Server/.env` with new credentials
   - Optionally: Regenerate Firebase web config

3. **Commit and push the .gitignore:**
   ```bash
   git add .gitignore Server/.gitignore Client/.gitignore
   git commit -m "Add comprehensive .gitignore"
   git push
   ```

---

## 📋 Checklist Before Pushing

- [ ] `.gitignore` files are in place
- [ ] Ran `git status` - no `.env` files listed
- [ ] `.env.example` files have placeholder values only
- [ ] No MongoDB connection strings in code
- [ ] No Firebase keys in code
- [ ] `node_modules/` is ignored
- [ ] Tested that secrets are not in `git ls-files`

---

## 🎯 What to Share vs Keep Secret

### ✅ Safe to Share (Push to Git)

- Source code (`.js`, `.jsx`, `.css`, etc.)
- `.env.example` files (with placeholders)
- `.gitignore` files
- Documentation (`.md` files)
- `package.json` and `package-lock.json`
- Configuration files (without secrets)

### ❌ NEVER Share (Keep Local Only)

- `.env` files
- `.env.local` files
- MongoDB connection strings
- Firebase private keys
- Firebase service account JSON files
- API keys and secrets
- Passwords

---

## 🔐 Additional Security Tips

### 1. Use Environment Variables in Production

Never hardcode secrets in your code. Always use environment variables.

### 2. Different Secrets for Different Environments

- Development: Use test/development credentials
- Production: Use separate production credentials

### 3. Limit Access

- MongoDB: Whitelist only necessary IP addresses
- Firebase: Use appropriate security rules

### 4. Regular Rotation

- Rotate secrets periodically
- Rotate immediately if compromised

### 5. Use GitHub Secrets for CI/CD

If using GitHub Actions, store secrets in:

- Repository Settings → Secrets and variables → Actions

---

## 📚 Example .env.example Files

### Server/.env.example

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database

FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### Client/.env.example

```env
VITE_API_URL=http://localhost:5000/api

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abc123
```

---

## ✅ You're Protected!

Your `.gitignore` files are now configured to protect:

- MongoDB credentials
- Firebase secrets
- Environment variables
- Service account keys

**You can safely push to Git!** 🚀

Just remember:

1. Never commit `.env` files
2. Always use `.env.example` with placeholders
3. Check `git status` before committing
4. Rotate secrets if accidentally exposed
