import { useQuery } from "react-query";
import { fetchUser, getAid } from "../api";

export * from "./useGetCode";
export * from "./useMutateLogin";

export const useUser = () => {
  return useQuery("user", fetchUser, {
    refetchOnReconnect: "always",
    retry: 1,
  });
};
