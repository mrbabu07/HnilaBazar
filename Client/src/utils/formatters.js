// Format view count for display
export const formatViewCount = (count) => {
  if (!count || count === 0) return "0 views";

  if (count === 1) return "1 view";

  if (count < 1000) {
    return `${count} views`;
  } else if (count < 1000000) {
    return `${(count / 1000).toFixed(1)}k views`;
  } else {
    return `${(count / 1000000).toFixed(1)}M views`;
  }
};

// Format price for display
export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

// Format date for display
export const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
};
