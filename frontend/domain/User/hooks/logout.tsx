import { useMutation, useQueryClient } from "react-query";
import { setAccessToken } from "utils/accessToken";
import { logout } from "../api";

export const useMutateLogout = () => {
  const queryClient = useQueryClient();

  return useMutation(logout, {
    onSuccess: () => {
      queryClient.invalidateQueries("verify");
      queryClient.removeQueries("user");
      setAccessToken("");
    },
  });
};
