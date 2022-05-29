import axios from "axios";
import jwt_decode from "jwt-decode";
import { WINDOW_URL } from "utils";

import { IUser } from "api/auth/userDB";
import {
  getAccessToken,
  setAccessToken,
} from "domain/User/services/accessToken";

import { IUserQuery, User } from "../types";

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

export const fetchMe = async () => {
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

export const fetchUsers = async (name: string, isSeller?: boolean) => {
  const res = await axios.post<{ users: User[] }>("/users", {
    name,
    isSeller,
  });
  return res.data.users;
};

export const fetchUserByPickupNum = async (pickupNum: number) => {
  const res = await axios.get<{ user: User }>(`/users/pickupNum/${pickupNum}`);
  return res.data.user;
};

export const fetchUserComment = async (username: string) => {
  const res = await axios.get<{ comment: string }>(
    `/users/${username}/comment`
  );
  return res.data.comment;
};

interface PatchUserCommentParams {
  username: string;
  comment: string;
}

export const patchUserComment = async ({
  username,
  comment,
}: PatchUserCommentParams) => {
  const res = await axios.patch<{ comment: string }>(
    `/users/${username}/comment`,
    { comment }
  );
  return res.data.comment;
};

interface SetLinePayParams {
  username: string;
  linepay: boolean;
}

export const setLinePay = async ({ username, linepay }: SetLinePayParams) => {
  const res = await axios.patch<{ user: IUser }>(`/users/${username}/linepay`, {
    linepay,
  });
  return res.data.user;
};

export const paginateUsers = async (limit: number, query: IUserQuery) => {
  const res = await axios.post<{
    users: IUser[];
    hasNextPage: boolean;
    length: number;
  }>("/users/paginate", {
    limit,
    page: query.page,
    query,
  });
  return res.data;
};

export const fetchUser = async (userId: string) => {
  const res = await axios.get<{ user: User }>(`/users/${userId}`);
  return res.data.user;
};

const AWS_UPLOAD_URL =
  "https://4tr9p3bu1e.execute-api.ap-east-1.amazonaws.com/prod/upload-image?bucket=tuango-tw-images";

interface UploadImageParams {
  image: unknown;
  filename: string;
  imageType: "sm" | "md" | "profile";
}

export const uploadImage = async ({
  image,
  filename,
  imageType,
}: UploadImageParams) => {
  await axios.put(
    `${AWS_UPLOAD_URL}&key=${filename}/${imageType}.jpeg`,
    image,
    { headers: { "Content-Type": "image/jpeg" }, withCredentials: false }
  );
  return `https://d2lduww19xwizo.cloudfront.net/${filename}/${imageType}.jpeg`;
};

export const patchUser = async (user: IUser) => {
  const res = await axios.patch<{ user: User }>(`/users/${user._id}`, { user });
  return res.data.user;
};

export const approveUser = async (userId: string) => {
  return axios.patch(`/users/${userId}/approve`);
};
