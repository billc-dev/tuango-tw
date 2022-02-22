import { useMutation, useQueryClient } from "react-query";

import { setAccessToken } from "domain/User/services/accessToken";

import { logout } from "../api";

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
