# 🚀 Git Push Guide

## 🔐 Security Check FIRST!

### Step 1: Run Security Check

```bash
# Windows
check-secrets.bat

# Or manually verify:
git ls-files | findstr "\.env"
```

**Expected output:** Only `.env.example` files should appear

**If you see `.env` or `.env.local`:**

```bash
# STOP! Remove them:
git rm --cached Server/.env
git rm --cached Client/.env.local

# Verify they're in .gitignore
type .gitignore | findstr "\.env"
```

---

## ✅ What's Protected

### Environment Files (NEVER commit these!)

- ❌ `Server/.env` - Contains MongoDB password, Firebase keys, SMTP password
- ❌ `Client/.env.local` - Contains Firebase config, API keys
- ✅ `Server/.env.example` - Template only (safe to commit)
- ✅ `Client/.env.example` - Template only (safe to commit)

### Other Sensitive Files

- ❌ `firebase-adminsdk-*.json` - Firebase service account
- ❌ `*.pem`, `*.key` - SSL certificates
- ❌ `Server/invoices/*.pdf` - Customer invoices
- ❌ `Server/uploads/*` - User uploaded files

---

## 📋 Pre-Push Checklist

- [ ] Run `check-secrets.bat` - All checks passed
- [ ] No `.env` files in `git status`
- [ ] No console.log with sensitive data
- [ ] No hardcoded credentials in code
- [ ] All secrets use environment variables
- [ ] `.env.example` files have placeholders only

---

## 🚀 Git Commands

### 1. Check Status

```bash
git status
```

### 2. Add Changes

```bash
git add .
```

### 3. Commit

```bash
git commit -m "v2.0.0: Transaction ID feature and documentation cleanup

- Fix: Transaction ID now saves correctly to database
- Add: Transaction ID in admin panel and invoices
- Fix: Clarify bKash Payment vs Send Money instructions
- Update: Contact information and payment numbers
- Refactor: Consolidate documentation into DOCS.md
- Remove: Debug console.logs from production code
- Security: Verify all secrets are protected"
```

### 4. Push

```bash
git push origin main
```

Or if your branch is `master`:

```bash
git push origin master
```

---

## ⚠️ Emergency: If You Pushed Secrets

### If You Just Pushed (Within 5 minutes)

1. **Delete the commit:**

   ```bash
   git reset --hard HEAD~1
   git push --force origin main
   ```

2. **Rotate ALL credentials immediately:**
   - Change MongoDB password
   - Regenerate Firebase private key
   - Change SMTP password
   - Regenerate API keys
   - Regenerate VAPID keys

### If It's Been Longer

1. **Rotate credentials FIRST** (most important!)
2. **Remove from history:**

   ```bash
   # Install BFG Repo Cleaner
   # Download: https://rtyley.github.io/bfg-repo-cleaner/

   bfg --delete-files .env
   bfg --delete-files .env.local

   git reflog expire --expire=now --all
   git gc --prune=now --aggressive

   git push --force origin main
   ```

3. **Check GitHub Security:**
   - Go to repository Settings > Security
   - Check for exposed secrets
   - Enable secret scanning

---

## 📦 What's Being Pushed

### Code Changes

- ✅ Transaction ID feature (saves correctly)
- ✅ Payment instructions (Payment vs Send Money)
- ✅ Contact information updated
- ✅ Invoice includes transaction ID
- ✅ Debug logs removed

### Documentation

- ✅ DOCS.md - Comprehensive guide
- ✅ SECURITY.md - Security guidelines
- ✅ CHANGELOG.md - Version history
- ✅ README.md - Project overview
- ✅ PUSH_GUIDE.md - This file

### Security

- ✅ .gitignore updated
- ✅ check-secrets.bat script
- ✅ All secrets protected
- ✅ .env.example files safe

---

## 🎯 After Pushing

### 1. Verify on GitHub

```bash
# Open repository in browser
start https://github.com/your-username/HnilaBazar
```

Check:

- [ ] No .env files visible
- [ ] Only .env.example files present
- [ ] README.md displays correctly
- [ ] DOCS.md is accessible

### 2. Test Deployment

If deploying to production:

- [ ] Set environment variables on hosting platform
- [ ] Test database connection
- [ ] Verify Firebase authentication
- [ ] Test email sending
- [ ] Check invoice generation

### 3. Monitor

- [ ] Check for GitHub security alerts
- [ ] Monitor error logs
- [ ] Test all features
- [ ] Verify transaction ID works

---

## 📞 Contact Information

**Business:**

- Phone: +880 1521-721946
- Email: mdjahedulislamjaved@gmail.com

**Payment Numbers:**

- bKash Merchant (Payment): 01521721946 ⭐
- bKash Personal (Send Money): 01621937035
- Nagad (Send Money): 01521721946
- Rocket (Send Money): 016219370359

---

## 📚 Additional Resources

- **SECURITY.md** - Complete security guide
- **DOCS.md** - Full documentation
- **CHANGELOG.md** - Version history
- **README.md** - Project overview

---

## ✅ Final Verification

Before pushing, answer these:

1. **Did you run `check-secrets.bat`?**
   - [ ] Yes, all checks passed

2. **Are .env files protected?**
   - [ ] Yes, in .gitignore

3. **Did you check `git status`?**
   - [ ] Yes, no .env files listed

4. **Are all secrets in environment variables?**
   - [ ] Yes, no hardcoded credentials

5. **Did you test the changes?**
   - [ ] Yes, everything works

**If all YES, you're ready to push!** 🚀

---

**Version:** 2.0.0  
**Date:** February 5, 2026  
**Status:** Secure & Ready ✅
