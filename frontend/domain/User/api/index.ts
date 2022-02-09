import axios, { AxiosResponse } from "axios";
import { User } from "../user";

type FetchUser = () => Promise<{ user: User }>;

export const fetchUser: FetchUser = () => {
  return axios.get("/user");
};
