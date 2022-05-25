export const IS_DEV = process.env.NODE_ENV === "development";

export const isClient = typeof window !== "undefined";

export const WINDOW_URL = isClient
  ? `${window.location.protocol}//${window.location.host}`
  : "";

export const indexAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const API_URL = IS_DEV
  ? "http://localhost:5000/tuango-tw-firebase/asia-east1/api_tw_firebase"
  : "https://asia-east1-tuango-tw-firebase.cloudfunctions.net/api_tw_firebase";
