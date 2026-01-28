/**
 * API Testing Script
 * Tests all backend endpoints to verify they're working
 */

const BASE_URL = "http://localhost:5000/api";

// ANSI color codes for terminal output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testEndpoint(name, url, method = "GET", expectedStatus = 200) {
  try {
    const response = await fetch(url, { method });
    const status = response.status;

    if (status === expectedStatus) {
      log(`✅ ${name}: ${status}`, "green");
      return true;
    } else {
      log(`❌ ${name}: Expected ${expectedStatus}, got ${status}`, "red");
      return false;
    }
  } catch (error) {
    log(`❌ ${name}: ${error.message}`, "red");
    return false;
  }
}

async function runTests() {
  log("\n🧪 Testing HnilaBazar Backend APIs\n", "cyan");
  log("=".repeat(50), "blue");

  const results = {
    passed: 0,
    failed: 0,
  };

  // Test endpoints
  const tests = [
    // Basic endpoints
    { name: "Server Health", url: `${BASE_URL.replace("/api", "")}` },

    // Product endpoints
    { name: "Get Products", url: `${BASE_URL}/products` },
    { name: "Get Categories", url: `${BASE_URL}/categories` },

    // Recommendation endpoints
    {
      name: "Get Trending Products",
      url: `${BASE_URL}/recommendations/trending`,
    },

    // Flash Sales endpoints
    { name: "Get Active Flash Sales", url: `${BASE_URL}/flash-sales/active` },
    {
      name: "Get Upcoming Flash Sales",
      url: `${BASE_URL}/flash-sales/upcoming`,
    },

    // Loyalty endpoints (public)
    { name: "Get Loyalty Leaderboard", url: `${BASE_URL}/loyalty/leaderboard` },

    // Coupon endpoints
    { name: "Get Coupons", url: `${BASE_URL}/coupons` },

    // Offer endpoints
    { name: "Get Offers", url: `${BASE_URL}/offers` },
  ];

  log("\n📡 Testing Public Endpoints:\n", "yellow");

  for (const test of tests) {
    const passed = await testEndpoint(test.name, test.url);
    if (passed) {
      results.passed++;
    } else {
      results.failed++;
    }
  }

  // Test protected endpoints (these should return 401 without auth)
  log("\n🔒 Testing Protected Endpoints (should return 401):\n", "yellow");

  const protectedTests = [
    { name: "Get My Orders", url: `${BASE_URL}/orders/my-orders` },
    { name: "Get My Wishlist", url: `${BASE_URL}/wishlist` },
    { name: "Get My Alerts", url: `${BASE_URL}/stock-alerts/my-alerts` },
    { name: "Get My Loyalty Points", url: `${BASE_URL}/loyalty/my-points` },
  ];

  for (const test of protectedTests) {
    const passed = await testEndpoint(test.name, test.url, "GET", 401);
    if (passed) {
      results.passed++;
    } else {
      results.failed++;
    }
  }

  // Summary
  log("\n" + "=".repeat(50), "blue");
  log("\n📊 Test Results:\n", "cyan");
  log(`✅ Passed: ${results.passed}`, "green");
  log(`❌ Failed: ${results.failed}`, "red");
  log(
    `📈 Success Rate: ${Math.round((results.passed / (results.passed + results.failed)) * 100)}%`,
    "cyan",
  );

  if (results.failed === 0) {
    log("\n🎉 All tests passed! Backend is working correctly.\n", "green");
  } else {
    log(
      "\n⚠️  Some tests failed. Check the errors above and ensure:\n",
      "yellow",
    );
    log("   1. Backend server is running (npm run dev)", "yellow");
    log("   2. MongoDB is connected", "yellow");
    log("   3. Database is seeded (npm run seed && node seedAll.js)", "yellow");
    log("   4. All routes are properly registered\n", "yellow");
  }

  process.exit(results.failed === 0 ? 0 : 1);
}

// Run tests
log("\n🚀 Starting API tests...\n", "cyan");
log("Make sure the backend server is running on http://localhost:5000\n");

setTimeout(() => {
  runTests();
}, 1000);
