/**
 * Check Email Service Status
 *
 * This script checks if the email service is properly initialized.
 */

require("dotenv").config();

console.log("🔍 Checking Email Service Configuration...\n");

// Check environment variables
console.log("📋 Environment Variables:");
console.log("=".repeat(60));

const requiredVars = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "APP_NAME",
  "APP_EMAIL",
  "FRONTEND_URL",
];

let allConfigured = true;

requiredVars.forEach((varName) => {
  const value = process.env[varName];
  const status = value ? "✅" : "❌";
  const displayValue =
    varName === "SMTP_PASS" && value
      ? "***" + value.slice(-4)
      : value || "NOT SET";

  console.log(`${status} ${varName}: ${displayValue}`);

  if (!value) {
    allConfigured = false;
  }
});

console.log("=".repeat(60));

if (!allConfigured) {
  console.log("\n❌ Email service is NOT properly configured!");
  console.log("\n📝 Missing variables need to be added to Server/.env:");
  console.log("\nExample:");
  console.log("SMTP_HOST=smtp.gmail.com");
  console.log("SMTP_PORT=587");
  console.log("SMTP_USER=your.notification.mail@gmail.com");
  console.log("SMTP_PASS=your_app_password");
  console.log("APP_NAME=HnilaBazar");
  console.log("APP_EMAIL=your.notification.mail@gmail.com");
  console.log("FRONTEND_URL=http://localhost:5173");
  process.exit(1);
}

console.log("\n✅ All environment variables are configured!");

// Try to initialize email service
console.log("\n🔧 Initializing Email Service...");
console.log("=".repeat(60));

try {
  const emailService = require("../services/emailService");

  // Wait a moment for initialization
  setTimeout(() => {
    console.log("\n✅ Email service loaded successfully!");
    console.log("\n📧 Email service is ready to send emails.");
    console.log("\n💡 Next steps:");
    console.log("   1. Restart your server: npm start");
    console.log("   2. Test emails: node scripts/testEmail.js");
    console.log("   3. Update order status in admin panel");
    console.log("   4. Check customer email inbox");

    process.exit(0);
  }, 2000);
} catch (error) {
  console.error("\n❌ Failed to load email service!");
  console.error("Error:", error.message);
  console.error("\nStack:", error.stack);
  process.exit(1);
}
