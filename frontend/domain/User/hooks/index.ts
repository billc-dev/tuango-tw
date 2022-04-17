import { useEffect } from "react";

import axios, { AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { IUser } from "api/auth/userDB";
import {
  getDeliveredOrderCount,
  getNotificationCount,
  getUserId,
  login,
  setupNotify,
} from "domain/User/api";
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
    onSuccess: (userResponse) => {
      localStorage.setItem("user", JSON.stringify(userResponse));
    },
  });
};

export const useMutateLogout = () => {
  const queryClient = useQueryClient();

  return useMutation(logout, {
    onSuccess: () => {
      setAccessToken("");
      localStorage.removeItem("user");
      axios.defaults.headers.common.Authorization = "";
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

export const useSetupNotify = () => {
  const queryClient = useQueryClient();
  return useMutation(setupNotify, {
    onSuccess: (data) => {
      queryClient.setQueryData<AxiosResponse<{ user: IUser }>>("user", data);
    },
  });
};

export const useIsAuthenticated = () => {
  const userQuery = useUser();
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [axios.defaults.headers.common.Authorization, userQuery.isFetching]);
  return typeof axios.defaults.headers.common.Authorization === "string";
};

export const useDeliveredOrderCount = () => {
  const isAuthenticated = useIsAuthenticated();
  return useQuery("deliveredOrderCount", getDeliveredOrderCount, {
    enabled: isAuthenticated,
  });
};

export const useNotificationCount = () => {
  const isAuthenticated = useIsAuthenticated();
  return useQuery("notificationCount", getNotificationCount, {
    enabled: isAuthenticated,
  });
};
