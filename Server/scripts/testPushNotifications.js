const webpush = require("web-push");
const { MongoClient } = require("mongodb");
require("dotenv").config();

// Configure web-push with VAPID keys
const vapidKeys = {
  publicKey:
    process.env.VAPID_PUBLIC_KEY ||
    "BEl62iUYgUivxIkv69yViEuiBIa40HI8YlOU2gKOt5-_qS3AROhD-cy_bUtpQHhNVA",
  privateKey:
    process.env.VAPID_PRIVATE_KEY ||
    "dUh2Q7blFqhvdQ9jD6uQrPQO8WA0lEjqahJI6br7SKI",
};

webpush.setVapidDetails(
  process.env.VAPID_EMAIL || "mailto:admin@hnilabazar.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey,
);

async function testPushNotifications() {
  console.log("🧪 Testing Push Notification System...");
  console.log("");

  // Test VAPID configuration
  console.log("🔑 VAPID Configuration:");
  console.log("Public Key:", vapidKeys.publicKey);
  console.log("Private Key:", vapidKeys.privateKey.substring(0, 20) + "...");
  console.log(
    "Email:",
    process.env.VAPID_EMAIL || "mailto:admin@hnilabazar.com",
  );
  console.log("");

  try {
    // Connect to MongoDB
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("HnilaBazar");
    const subscriptionsCollection = db.collection("notificationSubscriptions");

    // Check for existing subscriptions
    const subscriptions = await subscriptionsCollection
      .find({ isActive: true })
      .toArray();
    console.log(`📱 Found ${subscriptions.length} active subscription(s)`);

    if (subscriptions.length === 0) {
      console.log("");
      console.log("ℹ️  No active subscriptions found.");
      console.log("   To test push notifications:");
      console.log("   1. Start the server: npm run dev");
      console.log("   2. Open the app in a browser");
      console.log("   3. Go to Profile page");
      console.log("   4. Enable push notifications");
      console.log("   5. Run this test script again");
      console.log("");
      await client.close();
      return;
    }

    // Test sending notifications to all active subscriptions
    console.log("");
    console.log("📤 Sending test notifications...");

    const testNotification = {
      title: "🧪 Test Notification",
      body: "This is a test notification from HnilaBazar push notification system!",
      icon: "/icons/icon-192x192.png",
      badge: "/icons/icon-72x72.png",
      tag: "test-notification",
      data: {
        type: "test",
        url: "/",
        timestamp: new Date().toISOString(),
      },
    };

    const payload = JSON.stringify(testNotification);
    let successCount = 0;
    let failureCount = 0;

    for (const sub of subscriptions) {
      try {
        await webpush.sendNotification(sub.subscription, payload);
        successCount++;
        console.log(`✅ Notification sent to user: ${sub.userId}`);
      } catch (error) {
        failureCount++;
        console.error(
          `❌ Failed to send to user ${sub.userId}:`,
          error.message,
        );

        // If subscription is invalid, mark as inactive
        if (error.statusCode === 410 || error.statusCode === 404) {
          await subscriptionsCollection.updateOne(
            { _id: sub._id },
            { $set: { isActive: false, updatedAt: new Date() } },
          );
          console.log(
            `🗑️  Marked invalid subscription as inactive: ${sub.userId}`,
          );
        }
      }
    }

    console.log("");
    console.log("📊 Test Results:");
    console.log(`   ✅ Successful: ${successCount}`);
    console.log(`   ❌ Failed: ${failureCount}`);
    console.log(`   📱 Total tested: ${subscriptions.length}`);

    if (successCount > 0) {
      console.log("");
      console.log("🎉 Push notification system is working correctly!");
      console.log("   Check your browser/device for the test notification.");
    }

    await client.close();
    console.log("");
    console.log("✅ Test completed successfully");
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
}

// Run the test
testPushNotifications().catch(console.error);
