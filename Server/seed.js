require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const categories = [
  { name: "Men's", slug: "mens" },
  { name: "Women's", slug: "womens" },
  { name: "Electronics", slug: "electronics" },
  { name: "Baby", slug: "baby" },
];

async function seed() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("HnilaBazar");

    // Clear existing data
    await db.collection("categories").deleteMany({});
    await db.collection("products").deleteMany({});
    console.log("🗑️  Cleared existing data");

    // Insert categories
    const categoryResult = await db
      .collection("categories")
      .insertMany(categories);
    console.log(`✅ Inserted ${categoryResult.insertedCount} categories`);

    const insertedCategories = await db
      .collection("categories")
      .find({})
      .toArray();
    const categoryMap = {};
    insertedCategories.forEach((cat) => {
      categoryMap[cat.slug] = cat._id.toString();
    });

    // Sample products with working placeholder images
    const products = [
      // Men's products
      {
        title: "Men's Classic T-Shirt",
        price: 29.99,
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        categoryId: categoryMap.mens,
        stock: 50,
        description: "Comfortable cotton t-shirt for everyday wear",
      },
      {
        title: "Men's Denim Jeans",
        price: 59.99,
        image:
          "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
        categoryId: categoryMap.mens,
        stock: 30,
        description: "Classic fit denim jeans",
      },
      {
        title: "Men's Leather Jacket",
        price: 199.99,
        image:
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
        categoryId: categoryMap.mens,
        stock: 15,
        description: "Premium leather jacket",
      },
      {
        title: "Men's Running Shoes",
        price: 89.99,
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
        categoryId: categoryMap.mens,
        stock: 40,
        description: "Comfortable running shoes",
      },

      // Women's products
      {
        title: "Women's Summer Dress",
        price: 49.99,
        image:
          "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
        categoryId: categoryMap.womens,
        stock: 35,
        description: "Light and breezy summer dress",
      },
      {
        title: "Women's Handbag",
        price: 79.99,
        image:
          "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
        categoryId: categoryMap.womens,
        stock: 25,
        description: "Elegant leather handbag",
      },
      {
        title: "Women's High Heels",
        price: 69.99,
        image:
          "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop",
        categoryId: categoryMap.womens,
        stock: 20,
        description: "Stylish high heel shoes",
      },
      {
        title: "Women's Sunglasses",
        price: 39.99,
        image:
          "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop",
        categoryId: categoryMap.womens,
        stock: 45,
        description: "UV protection sunglasses",
      },

      // Electronics
      {
        title: "Wireless Headphones",
        price: 149.99,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        categoryId: categoryMap.electronics,
        stock: 60,
        description: "Noise-cancelling wireless headphones",
      },
      {
        title: "Smart Watch",
        price: 299.99,
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        categoryId: categoryMap.electronics,
        stock: 30,
        description: "Fitness tracking smart watch",
      },
      {
        title: "Laptop Stand",
        price: 49.99,
        image:
          "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
        categoryId: categoryMap.electronics,
        stock: 50,
        description: "Ergonomic laptop stand",
      },
      {
        title: "Wireless Mouse",
        price: 29.99,
        image:
          "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop",
        categoryId: categoryMap.electronics,
        stock: 80,
        description: "Ergonomic wireless mouse",
      },

      // Baby products
      {
        title: "Baby Stroller",
        price: 249.99,
        image:
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
        categoryId: categoryMap.baby,
        stock: 15,
        description: "Comfortable and safe baby stroller",
      },
      {
        title: "Baby Monitor",
        price: 89.99,
        image:
          "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop",
        categoryId: categoryMap.baby,
        stock: 25,
        description: "Video baby monitor with night vision",
      },
      {
        title: "Baby Clothes Set",
        price: 34.99,
        image:
          "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop",
        categoryId: categoryMap.baby,
        stock: 40,
        description: "Soft cotton baby clothes set",
      },
      {
        title: "Baby Toys Set",
        price: 24.99,
        image:
          "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop",
        categoryId: categoryMap.baby,
        stock: 55,
        description: "Safe and educational baby toys",
      },
    ];

    // Insert products
    const productResult = await db.collection("products").insertMany(products);
    console.log(`✅ Inserted ${productResult.insertedCount} products`);

    console.log("\n🎉 Database seeded successfully!");
    console.log("\n📊 Summary:");
    console.log(`   Categories: ${categoryResult.insertedCount}`);
    console.log(`   Products: ${productResult.insertedCount}`);
    console.log("\n💡 Next steps:");
    console.log("   1. Start the server: npm run dev");
    console.log("   2. Register a user in the frontend");
    console.log(
      "   3. Update user role to 'admin' in MongoDB to access admin features"
    );
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    await client.close();
  }
}

seed();
