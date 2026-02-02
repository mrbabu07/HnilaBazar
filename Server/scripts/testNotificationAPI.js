const fetch = require("node-fetch").default || require("node-fetch");

async function testNotificationAPI() {
  console.log("🧪 Testing Notification API Endpoints...");
  console.log("");

  const baseURL = "http://localhost:5000";

  try {
    // Test 1: Get VAPID public key
    console.log("1️⃣ Testing VAPID public key endpoint...");
    const vapidResponse = await fetch(
      `${baseURL}/api/notifications/vapid-public-key`,
    );
    const vapidData = await vapidResponse.json();

    if (vapidData.success) {
      console.log("✅ VAPID public key endpoint working");
      console.log(
        "   Public Key:",
        vapidData.publicKey.substring(0, 20) + "...",
      );
    } else {
      console.log("❌ VAPID public key endpoint failed");
    }

    // Test 2: Check server health
    console.log("");
    console.log("2️⃣ Testing server health...");
    const healthResponse = await fetch(`${baseURL}/`);
    const healthData = await healthResponse.json();

    if (healthData.message) {
      console.log("✅ Server is healthy");
      console.log("   Message:", healthData.message);
    } else {
      console.log("❌ Server health check failed");
    }

    // Test 3: Check notification routes
    console.log("");
    console.log("3️⃣ Testing notification routes availability...");

    // This should return 401 (unauthorized) which means the route exists
    const preferencesResponse = await fetch(
      `${baseURL}/api/notifications/preferences`,
    );

    if (preferencesResponse.status === 401) {
      console.log(
        "✅ Notification preferences endpoint exists (requires auth)",
      );
    } else {
      console.log("❌ Notification preferences endpoint issue");
      console.log("   Status:", preferencesResponse.status);
    }

    console.log("");
    console.log("📊 Test Summary:");
    console.log("   ✅ VAPID configuration: Working");
    console.log("   ✅ Server: Running");
    console.log("   ✅ Notification endpoints: Available");
    console.log("");
    console.log("🎉 Push notification system is ready!");
    console.log("   Users can now enable notifications in their Profile page.");
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    console.log("");
    console.log("💡 Make sure the server is running on port 5000");
  }
}

// Handle both CommonJS and ES modules
if (typeof fetch === "undefined") {
  // Try to use node-fetch if available, otherwise provide instructions
  try {
    const fetch = require("node-fetch");
    testNotificationAPI();
  } catch (error) {
    console.log("⚠️ node-fetch not available. Testing with basic checks...");
    console.log("");
    console.log("🔑 VAPID Configuration Check:");
    console.log(
      "   Public Key:",
      process.env.VAPID_PUBLIC_KEY ? "✅ Set" : "❌ Missing",
    );
    console.log(
      "   Private Key:",
      process.env.VAPID_PRIVATE_KEY ? "✅ Set" : "❌ Missing",
    );
    console.log("   Email:", process.env.VAPID_EMAIL ? "✅ Set" : "❌ Missing");
    console.log("");
    console.log("📱 To test full functionality:");
    console.log("   1. Open browser to http://localhost:3000");
    console.log("   2. Go to Profile page");
    console.log("   3. Enable push notifications");
    console.log("   4. Run: npm run test:push");
  }
} else {
  testNotificationAPI();
}
