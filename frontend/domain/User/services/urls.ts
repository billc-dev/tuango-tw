import { nanoid } from "nanoid";
import { WINDOW_URL } from "utils/constants";

export const LINE_REDIRECT_URL = `${WINDOW_URL}/redirect`;

export const LINE_LOGIN_URL = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1654947889&redirect_uri=${LINE_REDIRECT_URL}&state=${nanoid()}&scope=profile%20openid`;

export const LINE_LOGIN_URL_WITH_PARAMS = (params: string) => {
  return `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1654947889&redirect_uri=${LINE_REDIRECT_URL}${params}&state=${nanoid()}&scope=profile%20openid`;
};
