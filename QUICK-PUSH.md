# 🚀 Quick Push Guide

## Before Every Git Push

### 1️⃣ Run Security Check

```bash
# Windows
check-secrets.bat

# This checks:
# ✅ No .env files in Git
# ✅ .gitignore protection active
# ✅ Local .env files exist
```

### 2️⃣ If Check Passes, Push Safely

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

---

## 🔐 What's Protected

### ❌ NOT Pushed to Git (Safe)

- `Server/.env` - Contains MongoDB URI with credentials
- `Client/.env.local` - Contains local environment config
- `node_modules/` - Dependencies
- `dist/` - Build files

### ✅ Pushed to Git (Safe Templates)

- `Server/.env.example` - Template without real credentials
- `Client/.env.example` - Template without real credentials
- All source code
- Documentation

---

## 🆘 Quick Fixes

### If Security Check Fails

**Problem:** `.env` file found in Git

```bash
# Remove from Git (keeps local file)
git rm --cached Server/.env
git rm --cached Client/.env.local

# Commit the removal
git commit -m "Remove sensitive files"
```

**Problem:** `.env` not in `.gitignore`

```bash
# Add to .gitignore
echo .env >> .gitignore
echo .env.local >> .gitignore

# Commit
git add .gitignore
git commit -m "Update .gitignore"
```

---

## 📋 Your MongoDB Credentials

**Location:** `Server/.env`

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
```

**Status:** ✅ Protected by `.gitignore`  
**Will be pushed:** ❌ NO  
**Safe to push code:** ✅ YES

---

## 🎯 One-Line Check

```bash
# Quick verification
check-secrets.bat && git push origin main
```

This runs the security check and only pushes if it passes!

---

**Last Updated:** February 5, 2026  
**Your MongoDB credentials are SAFE!** 🔒
