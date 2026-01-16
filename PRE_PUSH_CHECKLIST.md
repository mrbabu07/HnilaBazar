# ✅ Pre-Push Checklist

## Quick Security Check Before Pushing to Git

### 1. Check Git Status

```bash
git status
```

**Verify:**

- ❌ NO `.env` files listed
- ❌ NO `.env.local` files listed
- ❌ NO `*-firebase-adminsdk-*.json` files
- ✅ YES `.env.example` files (these are safe)

---

### 2. Verify .gitignore is Working

```bash
git ls-files | grep -E "\\.env$|\\.env\\.local$"
```

**Expected result:** Empty (no output)

If you see any `.env` files, they're being tracked! Remove them:

```bash
git rm --cached Server/.env
git rm --cached Client/.env.local
```

---

### 3. Check for Secrets in Code

Search your code for hardcoded secrets:

```bash
# Check for MongoDB URIs
grep -r "mongodb+srv://" --include="*.js" --include="*.jsx" .

# Check for Firebase keys (should only be in .env files)
grep -r "AIzaSy" --include="*.js" --include="*.jsx" .
```

**Expected:** Only found in `.env` files (which are ignored)

---

### 4. Verify Example Files Have Placeholders

```bash
cat Server/.env.example
cat Client/.env.example
```

**Verify:**

- ✅ Contains `your_mongodb_connection_string` (not real URI)
- ✅ Contains `your_api_key` (not real keys)
- ✅ No actual passwords or secrets

---

### 5. Final Check

```bash
# See what will be committed
git diff --cached

# Or for all changes
git diff
```

**Look for:**

- ❌ MongoDB connection strings
- ❌ Firebase private keys
- ❌ API keys
- ❌ Passwords

---

## ✅ Safe to Push!

If all checks pass, you can safely push:

```bash
git add .
git commit -m "Your commit message"
git push
```

---

## 🚨 If You Find Secrets

### Found in Staged Files

```bash
# Unstage the file
git reset HEAD Server/.env

# Make sure it's in .gitignore
echo "Server/.env" >> .gitignore
```

### Found in Code

- Move secrets to `.env` files
- Use `process.env.VARIABLE_NAME` to access them
- Update `.env.example` with placeholder

### Already Committed (Not Pushed)

```bash
# Remove from last commit
git rm --cached Server/.env
git commit --amend
```

### Already Pushed to GitHub

1. Rotate all secrets immediately
2. See GIT_SECURITY_GUIDE.md for history cleanup

---

## 📋 Quick Checklist

Before every push:

- [ ] Ran `git status` - no `.env` files
- [ ] Ran `git ls-files | grep .env` - empty result
- [ ] Checked `.env.example` files - only placeholders
- [ ] No secrets in code files
- [ ] `.gitignore` files are committed
- [ ] Tested locally - everything works

---

**Remember:** It's better to be safe than sorry! Take 30 seconds to verify before pushing. 🔒
