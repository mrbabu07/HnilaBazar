/**
 * Fix Admin-Created Coupons
 *
 * This script fixes coupons that were created by admin with BDT values
 * stored as USD (causing huge minimum order amounts)
 */

require("dotenv").config();
const mongoose = require("mongoose");

const fixAdminCoupons = async () => {
  try {
    console.log("🔧 Fixing admin-created coupons...\n");

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB\n");

    const couponSchema = new mongoose.Schema({
      code: String,
      name: String,
      discountType: String,
      discountValue: Number,
      maxDiscountAmount: Number,
      minOrderAmount: Number,
      isActive: Boolean,
    });

    const Coupon = mongoose.model("Coupon", couponSchema);

    // Find coupons with suspiciously high min order amounts (> 100 USD = ৳11,000)
    const problematicCoupons = await Coupon.find({
      minOrderAmount: { $gt: 100 },
    });

    if (problematicCoupons.length === 0) {
      console.log("✅ No problematic coupons found!");
    } else {
      console.log(`Found ${problematicCoupons.length} coupon(s) to fix:\n`);

      for (const coupon of problematicCoupons) {
        console.log(`Fixing: ${coupon.code} - ${coupon.name}`);
        console.log(
          `  Old min order: ${coupon.minOrderAmount} USD (৳${Math.round(coupon.minOrderAmount * 110)})`,
        );

        // Convert from BDT to USD (divide by 110)
        const newMinOrder = coupon.minOrderAmount / 110;
        const newMaxDiscount = coupon.maxDiscountAmount
          ? coupon.maxDiscountAmount / 110
          : null;
        const newDiscountValue =
          coupon.discountType === "fixed"
            ? coupon.discountValue / 110
            : coupon.discountValue;

        await Coupon.updateOne(
          { _id: coupon._id },
          {
            $set: {
              minOrderAmount: newMinOrder,
              maxDiscountAmount: newMaxDiscount,
              discountValue: newDiscountValue,
            },
          },
        );

        console.log(
          `  New min order: ${newMinOrder.toFixed(2)} USD (৳${Math.round(newMinOrder * 110)})`,
        );
        if (newMaxDiscount) {
          console.log(
            `  New max discount: ${newMaxDiscount.toFixed(2)} USD (৳${Math.round(newMaxDiscount * 110)})`,
          );
        }
        if (coupon.discountType === "fixed") {
          console.log(
            `  New discount value: ${newDiscountValue.toFixed(2)} USD (৳${Math.round(newDiscountValue * 110)})`,
          );
        }
        console.log(`  ✅ Fixed!\n`);
      }

      console.log("🎉 All coupons fixed successfully!");
    }

    await mongoose.connection.close();
    console.log("\n✅ Database connection closed");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

fixAdminCoupons();
