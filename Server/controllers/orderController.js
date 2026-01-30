const emailService = require("../services/emailService");

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
    const {
      products,
      total,
      shippingInfo,
      paymentMethod,
      specialInstructions,
      couponCode,
    } = req.body;

    // Log the received data for debugging
    console.log("📦 Creating order with data:", {
      userId: req.user.uid,
      productsCount: products?.length,
      total,
      shippingInfo: shippingInfo ? "provided" : "missing",
      paymentMethod,
      specialInstructions: specialInstructions ? "provided" : "none",
      couponCode: couponCode || "none",
    });

    if (!products || !Array.isArray(products) || products.length === 0) {
      console.error("❌ Order creation failed: Invalid products");
      return res
        .status(400)
        .json({ success: false, error: "Invalid products" });
    }

    // Validate required shipping information
    if (
      !shippingInfo ||
      !shippingInfo.name ||
      !shippingInfo.email ||
      !shippingInfo.phone ||
      !shippingInfo.address ||
      !shippingInfo.city
    ) {
      console.error(
        "❌ Order creation failed: Missing shipping info",
        shippingInfo,
      );
      return res.status(400).json({
        success: false,
        error: "Missing required shipping information",
      });
    }

    // Validate product availability and update stock
    for (const item of products) {
      if (!item.productId) {
        console.error(
          "❌ Order creation failed: Missing productId in item",
          item,
        );
        return res.status(400).json({
          success: false,
          error: "Missing product ID in order items",
        });
      }

      const product = await Product.findById(item.productId);
      if (!product) {
        console.error(
          "❌ Order creation failed: Product not found",
          item.productId,
        );
        return res.status(400).json({
          success: false,
          error: `Product not found: ${item.productId}`,
        });
      }

      if (product.stock < item.quantity) {
        console.error("❌ Order creation failed: Insufficient stock", {
          product: product.title,
          available: product.stock,
          requested: item.quantity,
        });
        return res.status(400).json({
          success: false,
          error: `Insufficient stock for ${product.title}. Available: ${product.stock}, Requested: ${item.quantity}`,
        });
      }
    }

    // Create order with coupon support
    const orderData = {
      userId: req.user.uid,
      products,
      subtotal: total, // This will be recalculated in the model
      shippingInfo,
      paymentMethod,
      specialInstructions,
      couponCode,
    };

    console.log("📦 Creating order in database...");
    const orderId = await Order.create(orderData);
    console.log("✅ Order created successfully:", orderId);

    // Update product stock
    console.log("📦 Updating product stock...");
    for (const item of products) {
      await Product.updateStock(item.productId, item.quantity);

      // Check for low stock and send alert
      const product = await Product.findById(item.productId);
      if (product && product.stock <= 10) {
        await emailService.sendLowStockAlert({
          productTitle: product.title,
          currentStock: product.stock,
          productId: product._id,
        });
      }
    }
    console.log("✅ Product stock updated successfully");

    // Send order confirmation email
    try {
      console.log("📧 Sending order confirmation email...");
      await emailService.sendOrderConfirmation({
        userEmail: shippingInfo.email,
        userName: shippingInfo.name,
        orderId: orderId.toString(),
        products,
        total,
        shippingInfo,
      });
      console.log("✅ Order confirmation email sent");
    } catch (emailError) {
      console.error("⚠️ Failed to send order confirmation email:", emailError);
      // Don't fail the order creation if email fails
    }

    console.log("🎉 Order creation completed successfully");
    res.status(201).json({
      success: true,
      data: { orderId },
      message: "Order created successfully",
    });
  } catch (error) {
    console.error("❌ Error creating order:", error);
    console.error("❌ Error stack:", error.stack);
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const Order = req.app.locals.models.Order;
    const loyaltyService = require("../services/loyaltyService");
    const { id } = req.params;
    const { status, trackingNumber } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        error: "Status is required",
      });
    }

    const validStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: `Status must be one of: ${validStatuses.join(", ")}`,
      });
    }

    // Get order details for email notification and loyalty points
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        error: "Order not found",
      });
    }

    const result = await Order.updateStatus(id, status);

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        error: "Order not found",
      });
    }

    // Award loyalty points when order is delivered
    if (status === "delivered" && order.userId) {
      try {
        console.log("🎁 Awarding loyalty points for delivered order:", {
          orderId: id,
          userId: order.userId,
          orderTotal: order.total,
        });

        await loyaltyService.awardPointsForOrder(
          order.userId,
          order.shippingInfo?.email || "unknown@email.com",
          order.total,
          id,
        );

        console.log("✅ Loyalty points awarded successfully");
      } catch (loyaltyError) {
        console.error("⚠️ Failed to award loyalty points:", loyaltyError);
        // Don't fail the status update if loyalty points fail
      }
    }

    // Send status update email
    try {
      await emailService.sendOrderStatusUpdate({
        userEmail: order.shippingInfo.email,
        userName: order.shippingInfo.name,
        orderId: id,
        status,
        trackingNumber,
      });
    } catch (emailError) {
      console.error("Failed to send order status email:", emailError);
      // Don't fail the status update if email fails
    }

    res.json({
      success: true,
      message: "Order status updated successfully",
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllOrders,
  getUserOrders,
  createOrder,
  updateOrderStatus,
};
