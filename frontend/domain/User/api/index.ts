import axios, { AxiosResponse } from "axios";
import jwt_decode from "jwt-decode";

import { IUser } from "api/auth/userDB";
import {
  getAccessToken,
  setAccessToken,
} from "domain/User/services/accessToken";
import { WINDOW_URL } from "utils/constants";

type FetchVerifyStatus = () => Promise<
  AxiosResponse<{ authenticated: boolean }>
>;

export const fetchVerifyStatus: FetchVerifyStatus = () => {
  return axios.post(`${WINDOW_URL}/api/auth/verify`);
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
  return axios.get<{ user: IUser }>("/user");
};

interface LoginProps {
  code: string;
  url: string;
}

type Login = (
  variables: LoginProps
) => Promise<AxiosResponse<{ user: IUser; accessToken: string }>>;

export const login: Login = ({ code, url }) => {
  return axios.post<{ user: IUser; accessToken: string }>(
    `${WINDOW_URL}/api/auth/login`,
    { code, url }
  );
};

export const logout = () => {
  return axios.post(`${WINDOW_URL}/api/auth/logout`);
};

export const getUserId = (username: string) => {
  return axios.get<{ userId: string }>(`/user/userId/${username}`);
};

interface SetupNotifyParams {
  code: string;
  redirectUrl: string;
}

export const setupNotify = ({ code, redirectUrl }: SetupNotifyParams) => {
  return axios.post<{ user: IUser }>(`/notify/setup`, { code, redirectUrl });
};

export const getDeliveredOrderCount = async () => {
  const res = await axios.get<{ orderCount: number }>(
    "/user/deliveredOrderCount"
  );
  return res.data;
};

export const getNotificationCount = async () => {
  const res = await axios.get<{ notificationCount: number }>(
    "/user/notificationCount"
  );
  return res.data;
};
