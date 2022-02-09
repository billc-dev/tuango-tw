import axios, { AxiosResponse } from "axios";

interface LoginProps {
  code: string;
  url: string;
}

type Login = (variables: LoginProps) => Promise<AxiosResponse>;

export const login: Login = ({ code, url }) => {
  return axios.post("/login", { code, url }, { withCredentials: true });
};
