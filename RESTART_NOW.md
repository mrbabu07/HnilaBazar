# 🚨 RESTART YOUR SERVER NOW - Simple Instructions

## You're Still Getting 404 Errors Because Server Hasn't Been Restarted!

---

## ⚡ **EASIEST METHOD - Use the Restart Script**

### **Option 1: Double-Click Method (Easiest)**

1. **Navigate to** `Server` folder in File Explorer
2. **Double-click** `restart-server.bat`
3. **Watch for these messages:**
   ```
   ✅ Mongoose connected successfully  ← MUST SEE!
   ✅ Offers routes registered  ← MUST SEE!
   ```

### **Option 2: Command Line Method**

**Open a NEW terminal** and run:

```bash
cd Server
restart-server.bat
```

OR if using PowerShell:

```powershell
cd Server
.\restart-server.ps1
```

---

## 🔧 **MANUAL METHOD - If Scripts Don't Work**

### **Step 1: Find Your Server Terminal**

Look for the terminal that shows:

```
🔥 Server running on port 5000
```

### **Step 2: Stop It**

In that terminal, press: **`Ctrl + C`**

### **Step 3: Start It Again**

In the SAME terminal, type:

```bash
node index.js
```

Press **Enter**

### **Step 4: Verify Success**

You MUST see these messages:

```
✅ MongoDB connected successfully (HnilaBazar)
✅ Mongoose connected successfully  ← MUST SEE THIS!
🔧 Registering routes...
✅ Offers routes registered  ← MUST SEE THIS!
🔥 Server running on port 5000
```

---

## ❌ **If You DON'T See Those Messages**

The server is still running OLD code. Try this:

### **Kill All Node Processes:**

**Windows Command Prompt:**

```bash
taskkill /F /IM node.exe
```

**Then start fresh:**

```bash
cd Server
node index.js
```

---

## ✅ **How to Know It's Working**

### **In Server Console:**

- ✅ See "Mongoose connected successfully"
- ✅ See "Offers routes registered"
- ✅ No error messages

### **In Browser:**

1. Refresh the page (F5)
2. Open DevTools (F12) → Console tab
3. Should NOT see: `404 (Not Found)` for `/api/offers/active-popup`

### **Test the Route:**

Open a NEW terminal and run:

```bash
curl http://localhost:5000/api/offers/active-popup
```

**Should return:**

```json
{ "success": true, "data": null }
```

**NOT:**

```
Cannot GET /api/offers/active-popup
```

---

## 🎯 **After Successful Restart**

1. **Refresh your browser** (F5 or Ctrl+R)
2. **Go to:** `http://localhost:5173/admin/offers`
3. **Click:** "Create Offer" button
4. **Fill the form** and submit
5. **Should work!** ✅

---

## 🆘 **Still Not Working?**

### **Check 1: Are you in the right directory?**

```bash
cd Server
pwd  # Should show: .../HnilaBazar/Server
```

### **Check 2: Is mongoose installed?**

```bash
npm list mongoose
```

Should show: `mongoose@x.x.x`

If not:

```bash
npm install
```

### **Check 3: Is the server actually running?**

Open browser and go to:

```
http://localhost:5000
```

Should see:

```json
{
  "message": "HnilaBazar API is running 🚀",
  ...
}
```

---

## 📝 **Summary**

**Problem:** Server is running OLD code (before Mongoose was added)

**Solution:** Restart the server using one of these methods:

1. ✅ Double-click `Server/restart-server.bat` (EASIEST)
2. ✅ Run `cd Server && restart-server.bat` in terminal
3. ✅ Manually: `Ctrl+C` then `node index.js`

**Verify:** Look for "Mongoose connected successfully" message

**Test:** Go to `/admin/offers` and create an offer

---

## 🎉 **Once You See the Success Messages**

Your offer system will be fully functional:

- ✅ Create offers
- ✅ Upload images
- ✅ Edit/delete offers
- ✅ Users see popups

**Just restart the server and you're done!** 🚀
