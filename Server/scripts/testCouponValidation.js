/**
 * Test Coupon Validation Endpoint
 */

const testCouponValidation = async () => {
  try {
    console.log("🧪 Testing Coupon Validation Endpoint...\n");

    const testCases = [
      {
        name: "Valid coupon SAVE10 with $10 order",
        data: { code: "SAVE10", orderTotal: 10 },
      },
      {
        name: "Valid coupon FLAT100 with $15 order",
        data: { code: "FLAT100", orderTotal: 15 },
      },
      {
        name: "Valid coupon WELCOME50 with $8 order",
        data: { code: "WELCOME50", orderTotal: 8 },
      },
      {
        name: "Invalid coupon code",
        data: { code: "INVALID", orderTotal: 100 },
      },
      {
        name: "Missing code",
        data: { orderTotal: 100 },
      },
      {
        name: "Missing orderTotal",
        data: { code: "SAVE10" },
      },
    ];

    for (const testCase of testCases) {
      console.log(`\n📋 Test: ${testCase.name}`);
      console.log("   Data:", JSON.stringify(testCase.data));

      try {
        const response = await fetch(
          "http://localhost:5000/api/coupons/validate",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(testCase.data),
          },
        );

        const result = await response.json();
        console.log(`   Status: ${response.status}`);
        console.log("   Response:", JSON.stringify(result, null, 2));
      } catch (error) {
        console.error("   Error:", error.message);
      }
    }

    console.log("\n✅ Test completed!");
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
};

testCouponValidation();
