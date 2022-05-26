import axios from "axios";

import { IUser } from "api/auth/userDB";
import { WINDOW_URL } from "utils/constants";

interface FBLoginParams {
  code: string;
  redirect_uri: string;
}

export const fbLogin = ({ code, redirect_uri }: FBLoginParams) => {
  return axios.post<{ user: IUser; accessToken: string }>(
    `${WINDOW_URL}/api/fb_auth/login`,
    { code, redirect_uri }
  );
};
