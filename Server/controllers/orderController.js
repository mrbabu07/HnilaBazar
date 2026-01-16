const getAllOrders = async (req, res) => {
  try {
    const Order = req.app.locals.models.Order;
    const orders = await Order.findAll();
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const Order = req.app.locals.models.Order;
    const orders = await Order.findByUserId(req.user.uid);
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const Order = req.app.locals.models.Order;
    const Product = req.app.locals.models.Product;
    const { products, total } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid products" });
    }

    // Update stock for each product
    for (const item of products) {
      await Product.updateStock(item.productId, item.quantity);
    }

    const orderId = await Order.create({
      userId: req.user.uid,
      products,
      total: parseFloat(total),
    });

    res.status(201).json({ success: true, data: { id: orderId } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const Order = req.app.locals.models.Order;
    const { status } = req.body;

    if (
      !["pending", "processing", "shipped", "delivered", "cancelled"].includes(
        status
      )
    ) {
      return res.status(400).json({ success: false, error: "Invalid status" });
    }

    const result = await Order.updateStatus(req.params.id, status);

    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }

    res.json({ success: true, message: "Order status updated" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllOrders,
  getUserOrders,
  createOrder,
  updateOrderStatus,
};
