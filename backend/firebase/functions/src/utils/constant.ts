import { ConnectOptions } from "mongoose";

export const IS_DEV = process.env.NODE_ENV !== "production";
// export const IS_DEV = true;
export const indexAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const DB_OPTIONS: ConnectOptions = {
  // maxIdleTimeMS: 270000,
  connectTimeoutMS: 270000,
  serverSelectionTimeoutMS: 270000,
  // minPoolSize: 2,
  // maxPoolSize: 5,
};
