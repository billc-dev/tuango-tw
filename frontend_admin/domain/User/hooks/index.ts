import { useRouter } from "next/router";
import { useEffect } from "react";

import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  fetchUserByPickupNum,
  fetchUserComment,
  fetchUsers,
  login,
  patchUserComment,
  setLinePay,
} from "domain/User/api";
import { setAccessToken } from "domain/User/services/accessToken";

import { fetchUser, fetchVerifyStatus, logout } from "../api";

export const useMutateLogin = () => {
  const queryClient = useQueryClient();

  return useMutation(login, {
    onSuccess(data) {
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
    onSuccess(userResponse) {
      localStorage.setItem("user", JSON.stringify(userResponse));
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useMutateLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(logout, {
    onSuccess() {
      setAccessToken("");
      localStorage.removeItem("user");
      axios.defaults.headers.common.Authorization = "";
      queryClient.clear();
      router.push("/login");
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

export const useUsers = (name: string, isSeller?: boolean) => {
  return useQuery([name, isSeller], () => fetchUsers(name, isSeller), {
    enabled: !!name,
  });
};

export const useGetUserByPickupNum = () => {
  return useMutation(fetchUserByPickupNum);
};

export const useUserComment = (username: string) => {
  return useQuery(["userComment", username], () => fetchUserComment(username));
};

export const usePatchUserComment = () => {
  const queryClient = useQueryClient();
  return useMutation(patchUserComment, {
    onSuccess(data, params) {
      queryClient.setQueryData(["userComment", params.username], data);
    },
  });
};

export const useSetLinePay = () => {
  return useMutation(setLinePay);
};
