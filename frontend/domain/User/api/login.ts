import { IUser } from "api/auth/userDB";
import axios, { AxiosResponse } from "axios";
import { WINDOW_URL } from "utils/constants";

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
