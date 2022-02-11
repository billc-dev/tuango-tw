import axios, { AxiosResponse } from "axios";
import { WINDOW_URL } from "utils/constants";

interface LoginProps {
  code: string;
  url: string;
}

type Login = (variables: LoginProps) => Promise<AxiosResponse>;

export const login: Login = ({ code, url }) => {
  return axios.post(`${WINDOW_URL}/api/auth/login`, { code, url });
};
