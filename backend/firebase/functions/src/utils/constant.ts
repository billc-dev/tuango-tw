export const IS_DEV = process.env.NODE_ENV !== "production";
export const indexAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const DB_OPTIONS = {
  maxIdleTimeMS: 270000,
  minPoolSize: 2,
  maxPoolSize: 5,
};
