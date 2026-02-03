// Currency hook - Fixed to BDT only
// All prices are stored in USD in database, converted to BDT for display

const BDT_RATE = 110; // 1 USD = 110 BDT
const BDT_SYMBOL = "৳";

export function useCurrency() {
  // Always return BDT - no currency switching
  const currency = "BDT";

  const convertPrice = (priceInUSD) => {
    if (!priceInUSD && priceInUSD !== 0) return 0;
    return priceInUSD * BDT_RATE;
  };

  const formatPrice = (priceInUSD) => {
    if (!priceInUSD && priceInUSD !== 0) return `${BDT_SYMBOL}0`;
    const converted = convertPrice(priceInUSD);
    // Format with comma separators for BDT (no decimals)
    return `${BDT_SYMBOL}${Math.round(converted).toLocaleString()}`;
  };

  return {
    currency,
    convertPrice,
    formatPrice,
  };
}

export default useCurrency;
