const getAllCoupons = async (req, res) => {
  try {
    const Coupon = req.app.locals.models.Coupon;
    const coupons = await Coupon.findAll();
    res.json({ success: true, data: coupons });
  } catch (error) {
    console.error("Error fetching coupons:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const getCouponById = async (req, res) => {
  try {
    const Coupon = req.app.locals.models.Coupon;
    const { id } = req.params;

    const coupon = await Coupon.findById(id);
    if (!coupon) {
      return res
        .status(404)
        .json({ success: false, error: "Coupon not found" });
    }

    res.json({ success: true, data: coupon });
  } catch (error) {
    console.error("Error fetching coupon:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const getActiveCoupons = async (req, res) => {
  try {
    const Coupon = req.app.locals.models.Coupon;
    const coupons = await Coupon.getActiveCoupons();
    res.json({ success: true, data: coupons });
  } catch (error) {
    console.error("Error fetching active coupons:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const validateCoupon = async (req, res) => {
  try {
    const Coupon = req.app.locals.models.Coupon;
    const { code, orderTotal } = req.body;
    const userId = req.user?.uid;

    console.log("Validating coupon:", { code, orderTotal, userId });

    if (!code || !orderTotal) {
      console.log("Missing required fields:", {
        code: !!code,
        orderTotal: !!orderTotal,
      });
      return res.status(400).json({
        success: false,
        error: "Coupon code and order total are required",
      });
    }

    const validation = await Coupon.validateCoupon(code, orderTotal, userId);
    console.log("Validation result:", validation);

    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: validation.error,
      });
    }

    res.json({
      success: true,
      data: {
        coupon: validation.coupon,
        discountAmount: validation.discountAmount,
        finalTotal: orderTotal - validation.discountAmount,
      },
    });
  } catch (error) {
    console.error("Error validating coupon:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const createCoupon = async (req, res) => {
  try {
    const Coupon = req.app.locals.models.Coupon;
    const {
      code,
      name,
      description,
      discountType,
      discountValue,
      maxDiscountAmount,
      minOrderAmount,
      usageLimit,
      userUsageLimit,
      expiresAt,
      isActive = true,
    } = req.body;

    // Validation
    if (!code || !name || !discountType || !discountValue || !expiresAt) {
      return res.status(400).json({
        success: false,
        error:
          "Missing required fields: code, name, discountType, discountValue, expiresAt",
      });
    }

    if (!["percentage", "fixed"].includes(discountType)) {
      return res.status(400).json({
        success: false,
        error: 'Discount type must be either "percentage" or "fixed"',
      });
    }

    if (
      discountType === "percentage" &&
      (discountValue < 1 || discountValue > 100)
    ) {
      return res.status(400).json({
        success: false,
        error: "Percentage discount must be between 1 and 100",
      });
    }

    // Check if coupon code already exists
    const existingCoupon = await Coupon.findByCode(code);
    if (existingCoupon) {
      return res.status(400).json({
        success: false,
        error: "Coupon code already exists",
      });
    }

    const couponId = await Coupon.create({
      code,
      name,
      description,
      discountType,
      discountValue: parseFloat(discountValue),
      maxDiscountAmount: maxDiscountAmount
        ? parseFloat(maxDiscountAmount)
        : null,
      minOrderAmount: minOrderAmount ? parseFloat(minOrderAmount) : null,
      usageLimit: usageLimit ? parseInt(usageLimit) : null,
      userUsageLimit: userUsageLimit ? parseInt(userUsageLimit) : null,
      expiresAt: new Date(expiresAt),
      isActive,
      usedBy: [],
    });

    res.status(201).json({
      success: true,
      data: { id: couponId },
      message: "Coupon created successfully",
    });
  } catch (error) {
    console.error("Error creating coupon:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateCoupon = async (req, res) => {
  try {
    const Coupon = req.app.locals.models.Coupon;
    const { id } = req.params;
    const updateData = req.body;

    // Validation for discount type and value
    if (
      updateData.discountType &&
      !["percentage", "fixed"].includes(updateData.discountType)
    ) {
      return res.status(400).json({
        success: false,
        error: 'Discount type must be either "percentage" or "fixed"',
      });
    }

    if (updateData.discountType === "percentage" && updateData.discountValue) {
      if (updateData.discountValue < 1 || updateData.discountValue > 100) {
        return res.status(400).json({
          success: false,
          error: "Percentage discount must be between 1 and 100",
        });
      }
    }

    // Convert string numbers to proper types
    if (updateData.discountValue)
      updateData.discountValue = parseFloat(updateData.discountValue);
    if (updateData.maxDiscountAmount)
      updateData.maxDiscountAmount = parseFloat(updateData.maxDiscountAmount);
    if (updateData.minOrderAmount)
      updateData.minOrderAmount = parseFloat(updateData.minOrderAmount);
    if (updateData.usageLimit)
      updateData.usageLimit = parseInt(updateData.usageLimit);
    if (updateData.userUsageLimit)
      updateData.userUsageLimit = parseInt(updateData.userUsageLimit);
    if (updateData.expiresAt)
      updateData.expiresAt = new Date(updateData.expiresAt);

    const result = await Coupon.update(id, updateData);

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        error: "Coupon not found",
      });
    }

    res.json({
      success: true,
      message: "Coupon updated successfully",
    });
  } catch (error) {
    console.error("Error updating coupon:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteCoupon = async (req, res) => {
  try {
    const Coupon = req.app.locals.models.Coupon;
    const { id } = req.params;

    const result = await Coupon.delete(id);

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        error: "Coupon not found",
      });
    }

    res.json({
      success: true,
      message: "Coupon deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting coupon:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const applyCoupon = async (req, res) => {
  try {
    const Coupon = req.app.locals.models.Coupon;
    const { couponId } = req.body;
    const userId = req.user?.uid;

    if (!couponId) {
      return res.status(400).json({
        success: false,
        error: "Coupon ID is required",
      });
    }

    const result = await Coupon.applyCoupon(couponId, userId);

    res.json({
      success: true,
      message: "Coupon applied successfully",
    });
  } catch (error) {
    console.error("Error applying coupon:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllCoupons,
  getCouponById,
  getActiveCoupons,
  validateCoupon,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  applyCoupon,
};
