/**
 * Disable Free Delivery
 *
 * This script disables the free delivery feature.
 * After running this, ALL orders will have ৳100 delivery charge,
 * regardless of order amount.
 *
 * Admin can re-enable it from the Admin Dashboard > Delivery Settings.
 */

require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;

async function disableFreeDelivery() {
  try {
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB\n");

    const DeliverySettings = require("../models/DeliverySettings");
    const settings = await DeliverySettings.getSettings();

    console.log("📦 Current Settings:");
    console.log(`   Free Delivery Enabled: ${settings.freeDeliveryEnabled}`);
    console.log(
      `   Free Delivery Threshold: ৳${Math.round(settings.freeDeliveryThreshold * 110)}`,
    );

    // Disable free delivery
    settings.freeDeliveryEnabled = false;
    await settings.save();

    console.log("\n✅ Updated Settings:");
    console.log(`   Free Delivery Enabled: ${settings.freeDeliveryEnabled}`);
    console.log(
      `   Standard Delivery Charge: ৳${Math.round(settings.standardDeliveryCharge * 110)}`,
    );

    console.log("\n" + "=".repeat(60));
    console.log("🎉 Free delivery has been DISABLED!");
    console.log("💰 All orders will now have ৳100 delivery charge");
    console.log("⚙️  Admin can re-enable it from Admin Dashboard");
    console.log("=".repeat(60));

    await mongoose.disconnect();
    console.log("\n👋 Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

disableFreeDelivery();
