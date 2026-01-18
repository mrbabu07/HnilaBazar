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
    let discountAmount = 0;
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
            discountAmount = (subtotal * coupon.discountValue) / 100;
            if (coupon.maxDiscountAmount) {
              discountAmount = Math.min(
                discountAmount,
                coupon.maxDiscountAmount,
              );
            }
          } else {
            discountAmount = coupon.discountValue;
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
            discountAmount: Math.round(discountAmount * 100) / 100,
          };
        }
      } catch (couponError) {
        console.error("Error processing coupon:", couponError);
        // Continue without coupon if there's an error
      }
    }

    const finalTotal = subtotal - discountAmount + deliveryCharge;

    const result = await this.collection.insertOne({
      ...orderData,
      subtotal,
      discountAmount: Math.round(discountAmount * 100) / 100,
      deliveryCharge,
      total: Math.round(finalTotal * 100) / 100,
      couponApplied,
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
