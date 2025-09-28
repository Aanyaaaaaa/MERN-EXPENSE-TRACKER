// Currency formatting utility for Indian Rupees
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

// Convert USD to INR (approximate conversion rate)
export const convertUSDToINR = (usdAmount) => {
  const conversionRate = 83.5; // Approximate USD to INR rate
  return usdAmount * conversionRate;
};

// Format amount with Indian number system (lakhs, crores)
export const formatIndianCurrency = (amount) => {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  } else {
    return formatCurrency(amount);
  }
}; 