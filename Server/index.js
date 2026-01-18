require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

// Import models
const User = require("./models/User");
const Product = require("./models/Product");
const Category = require("./models/Category");
const Order = require("./models/Order");
const Wishlist = require("./models/Wishlist");
const Review = require("./models/Review");
const Coupon = require("./models/Coupon");
const Address = require("./models/Address");
const Return = require("./models/Return");
const Payment = require("./models/Payment");

// Import routes
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const couponRoutes = require("./routes/couponRoutes");
const addressRoutes = require("./routes/addressRoutes");
const returnRoutes = require("./routes/returnRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

// Import middleware and controllers for direct routes
const { verifyToken, verifyAdmin } = require("./middleware/auth");
const {
  createReturnRequest,
  getUserReturns,
  getAllReturns,
  updateReturnStatus,
} = require("./controllers/returnController");

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
      Wishlist: new Wishlist(db),
      Review: new Review(db),
      Coupon: new Coupon(db),
      Address: new Address(db),
      Return: new Return(db),
      Payment: new Payment(db),
    };

    // Store db reference for controllers that need it
    app.locals.db = db;

    // Routes
    app.get("/", (req, res) => {
      res.json({
        message: "HnilaBazar API is running 🚀",
        endpoints: {
          products: "/api/products",
          categories: "/api/categories",
          orders: "/api/orders",
          user: "/api/user",
          wishlist: "/api/wishlist",
          reviews: "/api/reviews",
          coupons: "/api/coupons",
          addresses: "/api/addresses",
          returns: "/api/returns",
          payments: "/api/payments",
        },
      });
    });

    // Debug: Test if routes are being registered
    console.log("🔧 Registering routes...");

    app.use("/api/products", productRoutes);
    console.log("✅ Products routes registered");

    app.use("/api/categories", categoryRoutes);
    console.log("✅ Categories routes registered");

    app.use("/api/orders", orderRoutes);
    console.log("✅ Orders routes registered");

    app.use("/api/user", userRoutes);
    console.log("✅ User routes registered");

    app.use("/api/wishlist", wishlistRoutes);
    console.log("✅ Wishlist routes registered");

    app.use("/api/reviews", reviewRoutes);
    console.log("✅ Reviews routes registered");

    app.use("/api/coupons", couponRoutes);
    console.log("✅ Coupons routes registered");

    app.use("/api/addresses", addressRoutes);
    console.log("✅ Addresses routes registered");

    app.use("/api/test-returns-path", returnRoutes);
    console.log("✅ Returns routes registered");
    app.use("/api/payments", paymentRoutes);
    console.log("✅ Payments routes registered");

    // Test route to verify addresses are working
    app.get("/api/test-addresses", (req, res) => {
      res.json({ message: "Test route working - addresses should work too!" });
    });

    // Test routes for debugging
    app.get("/api/test-returns", (req, res) => {
      res.json({
        message: "Returns test route working!",
        timestamp: new Date(),
      });
    });

    app.post("/api/test-returns", (req, res) => {
      res.json({ message: "Returns POST test route working!", data: req.body });
    });

    // Direct returns test route
    app.get("/api/returns-working", (req, res) => {
      res.json({ message: "Direct returns route is working!" });
    });

    app.post("/api/returns-working", (req, res) => {
      res.json({
        message: "Direct returns POST route is working!",
        data: req.body,
      });
    });

    // Direct returns routes for testing
    app.get("/api/returns/test", (req, res) => {
      console.log("🔥 Direct returns test route hit!");
      res.json({
        message: "Direct returns test working!",
        timestamp: new Date(),
      });
    });

    app.post("/api/returns", verifyToken, createReturnRequest);

    // Add other essential returns routes
    app.get("/api/returns/my-returns", verifyToken, getUserReturns);
    app.get("/api/returns/admin", verifyToken, verifyAdmin, getAllReturns);
    app.patch(
      "/api/returns/:id/status",
      verifyToken,
      verifyAdmin,
      updateReturnStatus,
    );

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
