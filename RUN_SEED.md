# 🌱 Seed the Database - Quick Guide

## Why Categories Aren't Showing

The database is empty! You need to run the seed script to add:

- 4 categories (Men's, Women's, Electronics, Baby)
- 16 sample products

---

## 🚀 How to Seed the Database

### Option 1: Using npm (Recommended)

Open a terminal/command prompt and run:

```bash
cd Server
npm run seed
```

### Option 2: Using node directly

```bash
cd Server
node seed.js
```

---

## ✅ Expected Output

You should see:

```
✅ Connected to MongoDB
🗑️  Cleared existing data
✅ Inserted 4 categories
✅ Inserted 16 products

🎉 Database seeded successfully!

📊 Summary:
   Categories: 4
   Products: 16

💡 Next steps:
   1. Start the server: npm run dev
   2. Register a user in the frontend
   3. Update user role to 'admin' in MongoDB to access admin features
```

---

## 🐛 If You Get Errors

### Error: "Cannot connect to MongoDB"

- Check that `MONGO_URI` is correct in `Server/.env`
- Verify your MongoDB Atlas cluster is running
- Check network access settings in MongoDB Atlas

### Error: "Module not found"

- Run `npm install` in the Server directory first

### Error: "dotenv not found"

- Run `npm install` in the Server directory

---

## 📝 Manual Steps (If Seed Script Fails)

If the seed script doesn't work, you can add categories manually:

### Using MongoDB Atlas Web Interface

1. Go to MongoDB Atlas
2. Click "Browse Collections"
3. Select database: `HnilaBazar`
4. Click "Create Collection" → Name: `categories`
5. Click "Insert Document" and add these one by one:

```json
{
  "name": "Men's",
  "slug": "mens",
  "createdAt": { "$date": "2024-01-01T00:00:00.000Z" }
}
```

```json
{
  "name": "Women's",
  "slug": "womens",
  "createdAt": { "$date": "2024-01-01T00:00:00.000Z" }
}
```

```json
{
  "name": "Electronics",
  "slug": "electronics",
  "createdAt": { "$date": "2024-01-01T00:00:00.000Z" }
}
```

```json
{
  "name": "Baby",
  "slug": "baby",
  "createdAt": { "$date": "2024-01-01T00:00:00.000Z" }
}
```

---

## ✅ Verify Categories Were Added

### Method 1: Check in Admin Panel

1. Make sure you're logged in as admin
2. Go to Admin Dashboard → Categories
3. You should see 4 categories

### Method 2: Check MongoDB Atlas

1. Go to MongoDB Atlas
2. Browse Collections
3. Database: `HnilaBazar` → Collection: `categories`
4. You should see 4 documents

### Method 3: Check API

Open in browser: `http://localhost:5000/api/categories`

You should see:

```json
{
  "success": true,
  "data": [
    { "_id": "...", "name": "Men's", "slug": "mens" },
    { "_id": "...", "name": "Women's", "slug": "womens" },
    { "_id": "...", "name": "Electronics", "slug": "electronics" },
    { "_id": "...", "name": "Baby", "slug": "baby" }
  ]
}
```

---

## 🎯 After Seeding

Once categories are added:

1. Refresh the admin "Add Product" page
2. Categories should now appear in the dropdown
3. You can add products!

---

## 💡 Quick Test

Run this in your terminal to test the seed:

```bash
cd "A:\programming hero\HnilaBazar\Server"
node seed.js
```

---

**The seed script should take about 5 seconds to complete!** 🚀
