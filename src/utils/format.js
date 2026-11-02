/**
 * Formats a numeric price into standard Indian Rupee format (e.g. ₹1,299)
 */
export const formatPrice = (price) => {
  return `₹${Number(price || 0).toLocaleString('en-IN')}`;
};
