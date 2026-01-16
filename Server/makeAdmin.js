/**
 * Make a user an admin
 * Usage: node makeAdmin.js your-email@example.com
 */

require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const email = process.argv[2];

if (!email) {
  console.log("❌ Please provide an email address");
  console.log("Usage: node makeAdmin.js your-email@example.com");
  process.exit(1);
}

async function makeAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    const user = await User.findOneAndUpdate(
      { email: email },
      { role: "admin" },
      { new: true }
    );

    if (user) {
      console.log(`✅ Success! ${email} is now an admin`);
      console.log("User:", { email: user.email, role: user.role });
    } else {
      console.log(`❌ User with email "${email}" not found`);
      console.log("Make sure you've logged in at least once first");
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

makeAdmin();
