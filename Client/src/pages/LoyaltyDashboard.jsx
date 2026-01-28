import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useToast } from "../context/ToastContext";
import { getCurrentUserToken } from "../utils/auth";
import Loading from "../components/Loading";

export default function LoyaltyDashboard() {
  const { user } = useAuth();
  const { success, error } = useToast();
  const [loyalty, setLoyalty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReferralInput, setShowReferralInput] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    if (user) {
      fetchLoyaltyData();
      fetchLeaderboard();
    }
  }, [user]);

  const fetchLoyaltyData = async () => {
    try {
      const token = await getCurrentUserToken();
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/loyalty/my-points`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        setLoyalty(data.data);
      } else {
        error("Failed to fetch loyalty data");
      }
    } catch (err) {
      console.error("Error fetching loyalty data:", err);
      error("Failed to fetch loyalty data");
    } finally {
      setLoading(false);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/loyalty/leaderboard?limit=10`,
      );

      if (response.ok) {
        const data = await response.json();
        setLeaderboard(data.data);
      }
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  const handleApplyReferral = async () => {
    if (!referralCode.trim()) {
      error("Please enter a referral code");
      return;
    }

    try {
      const token = await getCurrentUserToken();
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/loyalty/apply-referral`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ referralCode: referralCode.trim() }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        success(data.message);
        setShowReferralInput(false);
        setReferralCode("");
        fetchLoyaltyData();
      } else {
        error(data.message || "Failed to apply referral code");
      }
    } catch (err) {
      console.error("Error applying referral code:", err);
      error("Failed to apply referral code");
    }
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(loyalty.referralCode);
    success("Referral code copied to clipboard!");
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case "platinum":
        return "from-gray-400 to-gray-600";
      case "gold":
        return "from-yellow-400 to-yellow-600";
      case "silver":
        return "from-gray-300 to-gray-500";
      case "bronze":
      default:
        return "from-orange-400 to-orange-600";
    }
  };

  const getTierIcon = (tier) => {
    switch (tier) {
      case "platinum":
        return "💎";
      case "gold":
        return "🏆";
      case "silver":
        return "🥈";
      case "bronze":
      default:
        return "🥉";
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Loyalty Rewards
        </h1>
        <p className="text-gray-600">
          Earn points with every purchase and unlock exclusive benefits
        </p>
      </div>

      {/* Tier Card */}
      <div
        className={`bg-gradient-to-r ${getTierColor(loyalty?.tier)} rounded-2xl p-8 text-white mb-8 shadow-xl`}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-5xl">{getTierIcon(loyalty?.tier)}</span>
              <div>
                <h2 className="text-3xl font-bold capitalize">
                  {loyalty?.tier} Member
                </h2>
                <p className="text-white/80">
                  {loyalty?.benefits?.pointsMultiplier}x Points on Purchases
                </p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold">{loyalty?.points || 0}</div>
            <div className="text-white/80">Available Points</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-2xl font-bold">
              {loyalty?.totalEarned || 0}
            </div>
            <div className="text-sm text-white/80">Total Earned</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-2xl font-bold">
              {loyalty?.totalRedeemed || 0}
            </div>
            <div className="text-sm text-white/80">Total Redeemed</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-2xl font-bold">
              ${((loyalty?.points || 0) / 100).toFixed(2)}
            </div>
            <div className="text-sm text-white/80">Points Value</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-2xl font-bold">
              {loyalty?.benefits?.birthdayBonus || 0}
            </div>
            <div className="text-sm text-white/80">Birthday Bonus</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Benefits */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Your Benefits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  {loyalty?.benefits?.freeShipping ? "✓" : "✗"}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    Free Shipping
                  </div>
                  <div className="text-sm text-gray-600">
                    {loyalty?.benefits?.freeShipping
                      ? "On all orders"
                      : "Not available"}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  {loyalty?.benefits?.expressShipping ? "✓" : "✗"}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    Express Shipping
                  </div>
                  <div className="text-sm text-gray-600">
                    {loyalty?.benefits?.expressShipping
                      ? "Free express delivery"
                      : "Not available"}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  {loyalty?.benefits?.earlyAccess ? "✓" : "✗"}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    Early Access
                  </div>
                  <div className="text-sm text-gray-600">
                    {loyalty?.benefits?.earlyAccess
                      ? "To sales and new products"
                      : "Not available"}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  {loyalty?.benefits?.exclusiveDeals ? "✓" : "✗"}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    Exclusive Deals
                  </div>
                  <div className="text-sm text-gray-600">
                    {loyalty?.benefits?.exclusiveDeals
                      ? "Members-only offers"
                      : "Not available"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Recent Activity
            </h3>
            {loyalty?.transactions && loyalty.transactions.length > 0 ? (
              <div className="space-y-3">
                {loyalty.transactions.map((transaction, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === "earned"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {transaction.type === "earned" ? "+" : "-"}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {transaction.reason}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(transaction.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`font-bold ${
                        transaction.type === "earned"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type === "earned" ? "+" : "-"}
                      {transaction.points}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No transactions yet. Start shopping to earn points!
              </p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Referral Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Refer & Earn
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Share your referral code and earn 500 points for each friend who
              signs up!
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="text-xs text-gray-500 mb-1">
                Your Referral Code
              </div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-primary-600">
                  {loyalty?.referralCode}
                </div>
                <button
                  onClick={copyReferralCode}
                  className="p-2 hover:bg-gray-200 rounded-lg transition"
                  title="Copy code"
                >
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {!showReferralInput ? (
              <button
                onClick={() => setShowReferralInput(true)}
                className="w-full py-2 px-4 border border-primary-500 text-primary-500 rounded-lg hover:bg-primary-50 transition"
              >
                Have a Referral Code?
              </button>
            ) : (
              <div className="space-y-2">
                <input
                  type="text"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  placeholder="Enter referral code"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleApplyReferral}
                    className="flex-1 py-2 px-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => {
                      setShowReferralInput(false);
                      setReferralCode("");
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Leaderboard */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Top Members
            </h3>
            <div className="space-y-3">
              {leaderboard.map((member, index) => (
                <div
                  key={member._id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      index === 0
                        ? "bg-yellow-100 text-yellow-600"
                        : index === 1
                          ? "bg-gray-100 text-gray-600"
                          : index === 2
                            ? "bg-orange-100 text-orange-600"
                            : "bg-gray-50 text-gray-500"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {member.email.split("@")[0]}
                    </div>
                    <div className="text-xs text-gray-500 capitalize">
                      {member.tier} • {member.totalEarned} pts
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How to Earn */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-3">
              How to Earn Points
            </h3>
            <div className="space-y-2 text-sm text-blue-800">
              <p>• 1 point per $1 spent</p>
              <p>
                • {loyalty?.benefits?.pointsMultiplier}x multiplier for your
                tier
              </p>
              <p>• 500 points per referral</p>
              <p>
                • {loyalty?.benefits?.birthdayBonus} points on your birthday
              </p>
              <p className="pt-2 border-t border-blue-200">
                <strong>Redeem:</strong> 100 points = $1 discount
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
