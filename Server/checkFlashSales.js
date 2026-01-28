require("dotenv").config();
const mongoose = require("mongoose");
const FlashSale = require("./models/FlashSale");

const uri = process.env.MONGO_URI;

// Define a simple Product schema for population
const productSchema = new mongoose.Schema({}, { strict: false });
const Product = mongoose.model("Product", productSchema);

async function checkFlashSales() {
  try {
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB\n");

    const allSales = await FlashSale.find().populate("product");
    console.log(`📊 Total Flash Sales in Database: ${allSales.length}\n`);

    if (allSales.length === 0) {
      console.log("❌ No flash sales found!");
      console.log("\n💡 Run this command to add flash sales:");
      console.log("   npm run seed:flash\n");
      process.exit(0);
    }

    const now = new Date();

    const active = allSales.filter((sale) => {
      return (
        sale.isActive &&
        now >= sale.startTime &&
        now <= sale.endTime &&
        sale.soldCount < sale.totalStock
      );
    });

    const upcoming = allSales.filter((sale) => {
      return sale.isActive && now < sale.startTime;
    });

    const expired = allSales.filter((sale) => {
      return now > sale.endTime;
    });

    const soldOut = allSales.filter((sale) => {
      return sale.soldCount >= sale.totalStock;
    });

    console.log("📈 Flash Sales Status:");
    console.log("======================");
    console.log(`🟢 Active:   ${active.length}`);
    console.log(`🔵 Upcoming: ${upcoming.length}`);
    console.log(`⚫ Expired:  ${expired.length}`);
    console.log(`🔴 Sold Out: ${soldOut.length}\n`);

    if (active.length > 0) {
      console.log("🟢 ACTIVE SALES:");
      active.forEach((sale) => {
        const timeLeft = Math.round((sale.endTime - now) / 60000);
        console.log(`  ⚡ ${sale.title}`);
        console.log(`     Product: ${sale.product?.name || "N/A"}`);
        console.log(
          `     Price: ₹${sale.flashPrice} (${sale.discountPercentage}% off)`,
        );
        console.log(`     Time Left: ${timeLeft} minutes`);
        console.log(`     Stock: ${sale.soldCount}/${sale.totalStock}\n`);
      });
    }

    if (upcoming.length > 0) {
      console.log("🔵 UPCOMING SALES:");
      upcoming.forEach((sale) => {
        const startsIn = Math.round((sale.startTime - now) / 60000);
        console.log(`  ⏳ ${sale.title}`);
        console.log(`     Starts in: ${startsIn} minutes\n`);
      });
    }

    if (active.length === 0 && upcoming.length === 0) {
      console.log("⚠️  No active or upcoming sales!");
      console.log("\n💡 All sales may have expired. Run:");
      console.log("   npm run seed:flash\n");
    }

    console.log("\n🌐 Test URLs:");
    console.log("   Active:   http://localhost:5000/api/flash-sales/active");
    console.log("   Upcoming: http://localhost:5000/api/flash-sales/upcoming");
    console.log("   Frontend: http://localhost:5173/flash-sales\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

checkFlashSales();
