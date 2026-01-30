const { ObjectId } = require("mongodb");

class Order {
  constructor(db) {
    this.collection = db.collection("orders");
  }

  async findAll() {
    return await this.collection.find({}).sort({ createdAt: -1 }).toArray();
  }

  async findById(id) {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  async findByUserId(userId) {
    return await this.collection
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();
  }

  async create(orderData) {
    // Calculate delivery charge
    const subtotal = orderData.subtotal || orderData.total || 0;
    let deliveryCharge = subtotal < 100 ? 100 : 0; // 100tk delivery if order < 100tk

    // Apply coupon discount if provided
    let couponDiscountAmount = 0;
    let couponApplied = null;

    if (orderData.couponCode) {
      try {
        const couponsCollection = this.collection.db.collection("coupons");
        const coupon = await couponsCollection.findOne({
          code: orderData.couponCode.toUpperCase(),
          isActive: true,
          expiresAt: { $gt: new Date() },
        });

        if (coupon) {
          // Calculate discount
          if (coupon.discountType === "percentage") {
            couponDiscountAmount = (subtotal * coupon.discountValue) / 100;
            if (coupon.maxDiscountAmount) {
              couponDiscountAmount = Math.min(
                couponDiscountAmount,
                coupon.maxDiscountAmount,
              );
            }
          } else {
            couponDiscountAmount = coupon.discountValue;
          }

          // Apply coupon usage
          await couponsCollection.updateOne(
            { _id: coupon._id },
            {
              $inc: { usedCount: 1 },
              $push: {
                usedBy: { userId: orderData.userId, usedAt: new Date() },
              },
            },
          );

          couponApplied = {
            couponId: coupon._id,
            code: coupon.code,
            discountType: coupon.discountType,
            discountValue: coupon.discountValue,
            discountAmount: Math.round(couponDiscountAmount * 100) / 100,
          };
        }
      } catch (couponError) {
        console.error("Error processing coupon:", couponError);
        // Continue without coupon if there's an error
      }
    }

    // Handle points redemption
    const pointsDiscountAmount = orderData.pointsDiscount || 0;
    const redeemedPoints = orderData.redeemedPoints || 0;

    // Calculate total discount and final total
    const totalDiscountAmount = couponDiscountAmount + pointsDiscountAmount;

    // Recalculate delivery charge based on discounted amount
    const discountedSubtotal = subtotal - totalDiscountAmount;
    if (discountedSubtotal < 100 && subtotal >= 100) {
      deliveryCharge = 100; // Apply delivery charge if discounted total falls below 100
    }

    const finalTotal = subtotal - totalDiscountAmount + deliveryCharge;

    const result = await this.collection.insertOne({
      ...orderData,
      subtotal,
      couponDiscount: Math.round(couponDiscountAmount * 100) / 100,
      pointsDiscount: Math.round(pointsDiscountAmount * 100) / 100,
      totalDiscount: Math.round(totalDiscountAmount * 100) / 100,
      deliveryCharge,
      total: Math.round(finalTotal * 100) / 100,
      couponApplied,
      redeemedPoints,
      status: "pending",
      createdAt: new Date(),
    });
    return result.insertedId;
  }

  async updateStatus(id, status) {
    return await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, updatedAt: new Date() } },
    );
  }
}

module.exports = Order;
