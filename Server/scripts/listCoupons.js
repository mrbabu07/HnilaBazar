/**
 * List All Coupons
 */

require("dotenv").config();
const mongoose = require("mongoose");

const listCoupons = async () => {
  try {
    console.log("📋 Listing all coupons...\n");

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB\n");

    const couponSchema = new mongoose.Schema({
      code: String,
      name: String,
      description: String,
      discountType: String,
      discountValue: Number,
      maxDiscountAmount: Number,
      minOrderAmount: Number,
      usageLimit: Number,
      usedCount: Number,
      userUsageLimit: Number,
      expiresAt: Date,
      isActive: Boolean,
      createdAt: Date,
    });

    const Coupon = mongoose.model("Coupon", couponSchema);
    const coupons = await Coupon.find({});

    if (coupons.length === 0) {
      console.log("❌ No coupons found in database");
    } else {
      console.log(`Found ${coupons.length} coupon(s):\n`);

      coupons.forEach((coupon, index) => {
        console.log(`${index + 1}. ${coupon.code} - ${coupon.name}`);
        console.log(`   Type: ${coupon.discountType}`);
        console.log(`   Value: ${coupon.discountValue} (USD)`);
        if (coupon.discountType === "percentage") {
          console.log(`   Display: ${coupon.discountValue}%`);
        } else {
          console.log(`   Display: ৳${Math.round(coupon.discountValue * 110)}`);
        }
        console.log(
          `   Min Order: ${coupon.minOrderAmount || 0} USD (৳${Math.round((coupon.minOrderAmount || 0) * 110)})`,
        );
        if (coupon.maxDiscountAmount) {
          console.log(
            `   Max Discount: ${coupon.maxDiscountAmount} USD (৳${Math.round(coupon.maxDiscountAmount * 110)})`,
          );
        }
        console.log(`   Active: ${coupon.isActive ? "Yes" : "No"}`);
        console.log(
          `   Expires: ${new Date(coupon.expiresAt).toLocaleDateString()}`,
        );
        console.log(
          `   Used: ${coupon.usedCount || 0}${coupon.usageLimit ? ` / ${coupon.usageLimit}` : ""}`,
        );
        console.log();
      });
    }

    await mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

listCoupons();
