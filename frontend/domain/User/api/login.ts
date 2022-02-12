import axios, { AxiosResponse } from "axios";
import { IUser } from "api/auth/userDB";
import { setAccessToken } from "utils/accessToken";
import { WINDOW_URL } from "utils/constants";

interface LoginProps {
  code: string;
  url: string;
}

type Login = (variables: LoginProps) => Promise<AxiosResponse<{ user: IUser }>>;

export const login: Login = async ({ code, url }) => {
  const res = await axios.post<{ user: IUser; accessToken: string }>(
    `${WINDOW_URL}/api/auth/login`,
    { code, url }
  );
  setAccessToken(res.data.accessToken);
  return res;
};
