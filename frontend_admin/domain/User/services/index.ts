import { AxiosResponse } from "axios";
import { nanoid } from "nanoid";
import { WINDOW_URL, isClient } from "utils";

import { User } from "../types";

export const getRedirectUrl = () => {
  let url;
  if (typeof window !== "undefined") {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    url = urlParams.get("redirect");
  }
  return url;
};

export function getCode() {
  let code;
  if (typeof window !== "undefined") {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    code = urlParams.get("code");
  }
  return code;
}

export const LINE_REDIRECT_URL = `${WINDOW_URL}/redirect`;

export const LINE_LOGIN_URL = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1654947889&redirect_uri=${LINE_REDIRECT_URL}&state=${nanoid()}&scope=profile%20openid`;

export const LINE_LOGIN_URL_WITH_PARAMS = (params: string) => {
  return `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1654947889&redirect_uri=${LINE_REDIRECT_URL}${params}&state=${nanoid()}&scope=profile%20openid`;
};

export const getLocalStorageUser = () => {
  if (!isClient) return false;

  const user = localStorage.getItem("user");
  if (!user) return false;

  const parsedUser: AxiosResponse<{ user: User }> = JSON.parse(user);
  if (!parsedUser.data) return false;

  return parsedUser;
};
