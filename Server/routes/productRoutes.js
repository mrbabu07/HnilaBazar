const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require("../middleware/auth");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", verifyToken, verifyAdmin, createProduct);
router.put("/:id", verifyToken, verifyAdmin, updateProduct);
router.delete("/:id", verifyToken, verifyAdmin, deleteProduct);

module.exports = router;
