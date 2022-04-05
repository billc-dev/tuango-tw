import { useMutation, useQuery, useQueryClient } from "react-query";

import { getUserId, login } from "domain/User/api";
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
  return useQuery("verify", fetchVerifyStatus, {
    refetchOnMount: true,
  });
};

export const useUser = () => {
  const { data } = useIsVerified();

  return useQuery("user", fetchUser, {
    refetchOnReconnect: "always",
    refetchOnMount: true,
    enabled: !!data?.data.authenticated,
    retry: !!data?.data.authenticated,
  });
};

export const useMutateLogout = () => {
  const queryClient = useQueryClient();

  return useMutation(logout, {
    onSuccess: () => {
      setAccessToken("");
      queryClient.clear();
    },
  });
};

export const useIsSeller = () => {
  const { data } = useUser();
  return data && ["seller", "admin"].includes(data.data.user.role);
};

export const useUserId = () => {
  return useMutation(getUserId);
};
