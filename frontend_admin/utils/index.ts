import { NextRouter } from "next/router";

import { UrlObject } from "url";

export const shallowPush = (router: NextRouter, query: UrlObject["query"]) => {
  router.push({ query }, undefined, { shallow: true });
};

export const IS_DEV = process.env.NODE_ENV === "development";

export const isClient = typeof window !== "undefined";

export const WINDOW_URL = isClient
  ? `${window.location.protocol}//${window.location.host}`
  : "";

export const indexAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const API_URL = IS_DEV
  ? "http://localhost:5001/tuango-admin-api/asia-east1/api_backend_admin"
  : "https://asia-east1-tuango-admin-api.cloudfunctions.net/api_backend_admin";
