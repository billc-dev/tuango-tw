import { useRouter } from "next/router";
import { useEffect } from "react";

import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  fetchUser,
  fetchUserByPickupNum,
  fetchUserComment,
  fetchUsers,
  login,
  paginateUsers,
  patchUser,
  patchUserComment,
  setLinePay,
  uploadImage,
} from "domain/User/api";
import { setAccessToken } from "domain/User/services/accessToken";

import { fetchMe, fetchVerifyStatus, logout } from "../api";
import { IUserQuery } from "../types";

export const useMutateLogin = () => {
  const queryClient = useQueryClient();

  return useMutation(login, {
    onSuccess(data) {
      setAccessToken(data.accessToken);
      queryClient.setQueryData("me", { data });
      queryClient.invalidateQueries("verify");
    },
  });
};

export const useIsVerified = () => {
  return useQuery("verify", fetchVerifyStatus, {
    refetchOnMount: true,
  });
};

export const useMe = () => {
  const { data } = useIsVerified();

  return useQuery("me", fetchMe, {
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
  const userQuery = useMe();
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

export const usePaginateUsers = (limit: number, query: IUserQuery) => {
  return useQuery(["users", limit, query], () => paginateUsers(limit, query), {
    keepPreviousData: true,
    cacheTime: 0,
  });
};

export const useUser = (userId: string) => {
  return useQuery(["user", userId], () => fetchUser(userId), { cacheTime: 0 });
};

export const useUploadImage = () => {
  return useMutation(uploadImage);
};

export const usePatchUser = () => {
  const queryClient = useQueryClient();
  return useMutation(patchUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
};
