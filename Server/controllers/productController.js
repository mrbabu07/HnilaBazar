const getAllProducts = async (req, res) => {
  try {
    const Product = req.app.locals.models.Product;
    const { category } = req.query;

    const filter = category ? { categoryId: category } : {};
    const products = await Product.findAll(filter);

    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const Product = req.app.locals.models.Product;
    const { id } = req.params;

    // Log the request for debugging
    console.log(`🔍 Product request: ${id}`);

    // Validate ObjectId format
    if (!id || typeof id !== "string" || id.length !== 24) {
      console.log(`❌ Invalid ID format: ${id}`);
      return res
        .status(400)
        .json({ success: false, error: "Invalid product ID format" });
    }

    const product = await Product.findById(id);

    if (!product) {
      console.log(`❌ Product not found: ${id}`);
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    console.log(`✅ Product found: ${product.title}`);
    res.json({ success: true, data: product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const Product = req.app.locals.models.Product;
    const { title, price, image, categoryId, stock, description } = req.body;

    if (!title || !price || !categoryId) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
    }

    const productId = await Product.create({
      title,
      price: parseFloat(price),
      image,
      categoryId,
      stock: parseInt(stock) || 0,
      description,
    });

    res.status(201).json({ success: true, data: { id: productId } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const Product = req.app.locals.models.Product;
    const { id } = req.params;

    // Enhanced logging for debugging
    console.log("🔄 Product Update Request:");
    console.log("- Product ID:", id);
    console.log("- Request Body:", JSON.stringify(req.body, null, 2));

    // Validate ObjectId format
    if (!id || typeof id !== "string" || id.length !== 24) {
      console.log("❌ Invalid ID format:", id);
      return res.status(400).json({
        success: false,
        error: "Invalid product ID format",
      });
    }

    // Validate required fields
    const { title, price, categoryId } = req.body;
    if (!title || !price || !categoryId) {
      console.log("❌ Missing required fields:", {
        title: !!title,
        price: !!price,
        categoryId: !!categoryId,
      });
      return res.status(400).json({
        success: false,
        error: "Missing required fields: title, price, categoryId",
      });
    }

    // Sanitize and validate data
    const updateData = {
      ...req.body,
      price: parseFloat(req.body.price),
      stock: parseInt(req.body.stock) || 0,
      updatedAt: new Date(),
    };

    // Ensure arrays are properly formatted
    if (req.body.images && Array.isArray(req.body.images)) {
      updateData.images = req.body.images;
    }
    if (req.body.sizes && Array.isArray(req.body.sizes)) {
      updateData.sizes = req.body.sizes;
    }
    if (req.body.colors && Array.isArray(req.body.colors)) {
      updateData.colors = req.body.colors;
    }

    console.log(
      "📝 Sanitized Update Data:",
      JSON.stringify(updateData, null, 2),
    );

    const result = await Product.update(id, updateData);

    console.log("📊 Update Result:", result);

    if (result.matchedCount === 0) {
      console.log("❌ Product not found for ID:", id);
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    console.log("✅ Product updated successfully");
    res.json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    console.error("💥 Product Update Error:", error);
    console.error("Error Stack:", error.stack);
    res.status(500).json({
      success: false,
      error: error.message,
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const Product = req.app.locals.models.Product;
    const result = await Product.delete(req.params.id);

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const searchProducts = async (req, res) => {
  try {
    const Product = req.app.locals.models.Product;
    const { q } = req.query;

    if (!q || q.trim().length < 2) {
      return res.json({ success: true, data: [] });
    }

    // Simple text search - in production, you'd use MongoDB text search or Elasticsearch
    const products = await Product.findAll();
    const searchResults = products.filter(
      (product) =>
        product.title.toLowerCase().includes(q.toLowerCase()) ||
        (product.description &&
          product.description.toLowerCase().includes(q.toLowerCase())),
    );

    res.json({ success: true, data: searchResults });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
