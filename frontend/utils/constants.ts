export const IS_DEV = process.env.NODE_ENV === "development";

export const isClient = typeof window !== "undefined";

export const WINDOW_URL = isClient
  ? `${window.location.protocol}//${window.location.host}`
  : "";

export const indexAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
