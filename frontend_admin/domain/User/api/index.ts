import axios from "axios";
import jwt_decode from "jwt-decode";
import { WINDOW_URL } from "utils";

import {
  getAccessToken,
  setAccessToken,
} from "domain/User/services/accessToken";

import { User } from "../types";

export const fetchVerifyStatus = () => {
  return axios.post<{ authenticated: boolean }>(
    `${WINDOW_URL}/api/auth/verify`
  );
};

const fetchNewAccessToken = async () => {
  const res = await axios.post(`${WINDOW_URL}/api/auth/refresh`);

  if (res.data.tokenError) return;

  setAccessToken(res.data.accessToken);
};

export const isAuthenticated = () => {
  try {
    const accessToken = getAccessToken();
    const payload = jwt_decode<{ exp: number }>(accessToken);
    return payload.exp > Date.now() / 1000;
  } catch (error) {
    return false;
  }
};

export const fetchUser = async () => {
  if (!isAuthenticated()) await fetchNewAccessToken();
  return axios.get<{ user: User }>("/users/me");
};

interface LoginProps {
  code: string;
  url: string;
}

export const login = async ({ code, url }: LoginProps) => {
  const res = await axios.post<{ user: User; accessToken: string }>(
    `${WINDOW_URL}/api/auth/login`,
    { code, url }
  );
  return res.data;
};

export const logout = () => {
  return axios.post(`${WINDOW_URL}/api/auth/logout`);
};
