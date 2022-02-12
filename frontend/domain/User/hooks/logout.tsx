import { useMutation, useQueryClient } from "react-query";
import { logout } from "../api";

export const useMutateLogout = () => {
  const queryClient = useQueryClient();

  return useMutation(logout, {
    onSuccess: () => {
      queryClient.invalidateQueries("verify");
      queryClient.removeQueries("user");
    },
  });
};
