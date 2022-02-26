import { nanoid } from "nanoid";

import { WINDOW_URL } from "utils/constants";

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
