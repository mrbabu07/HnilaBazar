const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require("../middleware/auth");
const {
  getAllProducts,
  getProductById,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getFilterOptions,
  getLowStockProducts,
  getOutOfStockProducts,
  updateStockBulk,
  incrementProductView,
} = require("../controllers/productController");

// Public routes
router.get("/", getAllProducts);
router.get("/search", searchProducts);
router.get("/filter-options", getFilterOptions);
router.get("/:id", getProductById);
router.post("/:id/view", incrementProductView);

// Admin routes
router.get("/admin/low-stock", verifyToken, verifyAdmin, getLowStockProducts);
router.get(
  "/admin/out-of-stock",
  verifyToken,
  verifyAdmin,
  getOutOfStockProducts,
);
router.post("/", verifyToken, verifyAdmin, createProduct);
router.put("/:id", verifyToken, verifyAdmin, updateProduct);
router.delete("/:id", verifyToken, verifyAdmin, deleteProduct);
router.patch("/bulk-stock-update", verifyToken, verifyAdmin, updateStockBulk);

module.exports = router;
