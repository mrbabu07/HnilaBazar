/**
 * Set High Free Delivery Threshold
 *
 * This script sets the free delivery threshold to a very high amount (৳100,000).
 * This effectively disables free delivery for normal orders,
 * but keeps the feature available for admin to control.
 *
 * Alternative: Use disableFreeDelivery.js to completely disable the feature.
 */

require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;

async function setHighThreshold() {
  try {
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB\n");

    const DeliverySettings = require("../models/DeliverySettings");
    const settings = await DeliverySettings.getSettings();

    console.log("📦 Current Settings:");
    console.log(
      `   Free Delivery Threshold: ৳${Math.round(settings.freeDeliveryThreshold * 110)}`,
    );
    console.log(
      `   Standard Delivery Charge: ৳${Math.round(settings.standardDeliveryCharge * 110)}`,
    );

    // Set very high threshold (৳100,000 = ~$909 USD)
    const newThresholdBDT = 100000; // ৳100,000
    const newThresholdUSD = newThresholdBDT / 110;

    settings.freeDeliveryThreshold = newThresholdUSD;
    settings.freeDeliveryEnabled = true; // Keep enabled but with high threshold
    await settings.save();

    console.log("\n✅ Updated Settings:");
    console.log(
      `   Free Delivery Threshold: ৳${Math.round(settings.freeDeliveryThreshold * 110)}`,
    );
    console.log(`   Free Delivery Enabled: ${settings.freeDeliveryEnabled}`);

    console.log("\n" + "=".repeat(60));
    console.log("🎉 Free delivery threshold set to ৳100,000!");
    console.log("💰 Normal orders will have ৳100 delivery charge");
    console.log("⚙️  Admin can adjust threshold from Admin Dashboard");
    console.log("=".repeat(60));

    await mongoose.disconnect();
    console.log("\n👋 Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

setHighThreshold();
