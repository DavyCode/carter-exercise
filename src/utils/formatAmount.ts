const formatAmount = (num: number) => {
  const formatted = num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatted;
};
export const formatAmountVariant = (num: number) => {
  const formatted = num.toLocaleString();
  return formatted;
};

export default formatAmount;
