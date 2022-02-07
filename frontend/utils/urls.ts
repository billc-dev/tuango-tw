import { nanoid } from "nanoid";
import { IS_DEV } from "./constants";

export const WINDOW_URL =
  window.location.protocol + "//" + window.location.host;
export const REDIRECT_URL = IS_DEV
  ? "http://localhost:3000/redirect"
  : `${WINDOW_URL}/redirect`;
export const LINE_LOGIN_URL = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1654947889&redirect_uri=${REDIRECT_URL}&state=${nanoid()}&scope=profile%20openid`;
