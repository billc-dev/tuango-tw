import { useQuery } from "react-query";
import { fetchUser } from "../api";

export const useUser = () => {
  return useQuery("user", fetchUser, { retry: false });
};
