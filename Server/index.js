require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

// Import models
const User = require("./models/User");
const Product = require("./models/Product");
const Category = require("./models/Category");
const Order = require("./models/Order");

// Import routes
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB client
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("HnilaBazar").command({ ping: 1 });
    console.log("✅ MongoDB connected successfully (HnilaBazar)");

    const db = client.db("HnilaBazar");

    // Initialize models
    app.locals.models = {
      User: new User(db),
      Product: new Product(db),
      Category: new Category(db),
      Order: new Order(db),
    };

    // Routes
    app.get("/", (req, res) => {
      res.json({
        message: "HnilaBazar API is running 🚀",
        endpoints: {
          products: "/api/products",
          categories: "/api/categories",
          orders: "/api/orders",
          user: "/api/user",
        },
      });
    });

    app.use("/api/products", productRoutes);
    app.use("/api/categories", categoryRoutes);
    app.use("/api/orders", orderRoutes);
    app.use("/api/user", userRoutes);

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ success: false, error: "Something went wrong!" });
    });

    // Start server
    app.listen(port, () => {
      console.log(`🔥 Server running on port ${port}`);
    });
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
}

run();
