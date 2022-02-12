import { useQuery } from "react-query";
import { fetchUser } from "../api";
import { fetchVerifyStatus } from "../api/auth";

export const useIsVerified = () => {
  return useQuery("verify", fetchVerifyStatus);
};

export const useUser = () => {
  const { data } = useIsVerified();

  return useQuery("user", fetchUser, {
    refetchOnReconnect: "always",
    enabled: !!data?.data.authenticated,
  });
};
