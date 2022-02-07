import axios, { AxiosResponse } from "axios";

interface LoginProps {
  code: string;
  url: string;
}
type Login = ({ code, url }: LoginProps) => Promise<AxiosResponse>;

export const login: Login = ({ code, url }) => {
  return axios.post("/login", { code, url });
};
