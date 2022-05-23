export const getPercentage = (divident: number, divisor: number) => {
  return ((divident / divisor) * 100).toFixed(2) + "%";
};

export const getNumberWithCommas = (number?: number) => {
  if (typeof number === "undefined") return 0;
  return number.toLocaleString();
};
