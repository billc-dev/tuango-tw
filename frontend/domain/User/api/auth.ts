import axios, { AxiosResponse } from "axios";
import jwt_decode from "jwt-decode";
import { WINDOW_URL } from "utils/constants";

import {
  getAccessToken,
  setAccessToken,
} from "domain/User/services/accessToken";

import { User } from "../types";

type FetchVerifyStatus = () => Promise<
  AxiosResponse<{ authenticated: boolean }>
>;

export const fetchVerifyStatus: FetchVerifyStatus = () => {
  return axios.post(`${WINDOW_URL}/api/auth/verify`);
};

const fetchNewAccessToken = async () => {
  const res = await axios({
    method: "post",
    url: `${WINDOW_URL}/api/auth/refresh`,
  });

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

type FetchUser = () => Promise<AxiosResponse<{ user: User }>>;

export const fetchUser: FetchUser = async () => {
  if (!isAuthenticated()) await fetchNewAccessToken();
  return axios.get("/user");
};
