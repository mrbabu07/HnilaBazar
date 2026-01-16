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
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    res.json({ success: true, data: product });
  } catch (error) {
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
    const result = await Product.update(req.params.id, req.body);

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    res.json({ success: true, message: "Product updated" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
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

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
