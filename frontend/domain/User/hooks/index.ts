import { useMutation, useQuery, useQueryClient } from "react-query";

import { login } from "domain/User/api";
import { setAccessToken } from "domain/User/services/accessToken";

import { fetchUser, fetchVerifyStatus, logout } from "../api";

export const useMutateLogin = () => {
  const queryClient = useQueryClient();

  return useMutation(login, {
    onSuccess: ({ data }) => {
      setAccessToken(data.accessToken);
      queryClient.setQueryData("user", { data });
      queryClient.invalidateQueries("verify");
    },
  });
};

export const useIsVerified = () => {
  return useQuery("verify", fetchVerifyStatus);
};

export const useUser = () => {
  const { data } = useIsVerified();

  return useQuery("user", fetchUser, {
    refetchOnReconnect: "always",
    enabled: !!data?.data.authenticated,
    retry: !!data?.data.authenticated,
    staleTime: 1000 * 60,
  });
};

export const useMutateLogout = () => {
  const queryClient = useQueryClient();

  return useMutation(logout, {
    onSuccess: () => {
      setAccessToken("");
      queryClient.removeQueries("verify");
      queryClient.removeQueries("user");
    },
  });
};
