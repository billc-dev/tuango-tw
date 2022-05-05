export const getPercentage = (divident: number, divisor: number) => {
  return ((divident / divisor) * 100).toFixed(2) + "%";
};
