export const checkLimit = (limit: number) => {
  if (isNaN(limit)) throw "limit must be a number";
  if (limit <= 0) throw "limit must be greater than 0";
};
