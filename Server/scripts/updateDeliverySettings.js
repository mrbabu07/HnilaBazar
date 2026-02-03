require("dotenv").config();
const mongoose = require("mongoose");
const DeliverySettings = require("../models/DeliverySettings");

async function updateDeliverySettings() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Get or create settings
    let settings = await DeliverySettings.findOne();

    if (!settings) {
      settings = new DeliverySettings();
      console.log("📝 Creating new delivery settings");
    } else {
      console.log("📝 Updating existing delivery settings");
    }

    // Update settings
    settings.freeDeliveryThreshold = 50; // $50 USD = ৳5,500 BDT
    settings.standardDeliveryCharge = 100 / 110; // ৳100 BDT
    settings.freeDeliveryEnabled = true;
    settings.estimatedDeliveryDays = {
      min: 2,
      max: 5,
    };

    await settings.save();

    console.log("\n✅ Delivery Settings Updated:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(
      `Free Delivery Threshold: $${settings.freeDeliveryThreshold} USD (৳${Math.round(settings.freeDeliveryThreshold * 110)} BDT)`,
    );
    console.log(
      `Standard Delivery Charge: $${settings.standardDeliveryCharge.toFixed(2)} USD (৳${Math.round(settings.standardDeliveryCharge * 110)} BDT)`,
    );
    console.log(
      `Free Delivery Enabled: ${settings.freeDeliveryEnabled ? "✅ Yes" : "❌ No"}`,
    );
    console.log(
      `Estimated Delivery: ${settings.estimatedDeliveryDays.min}-${settings.estimatedDeliveryDays.max} days`,
    );
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("\n💡 Customers will now see:");
    console.log(
      `   "FREE delivery on orders over ৳${Math.round(settings.freeDeliveryThreshold * 110)}"`,
    );
    console.log(
      `   "Delivery charge: ৳${Math.round(settings.standardDeliveryCharge * 110)}"`,
    );

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

updateDeliverySettings();
