export const IS_DEV = process.env.NODE_ENV === "development";

export const WINDOW_URL =
  typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.host}`
    : "";

export const indexAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
