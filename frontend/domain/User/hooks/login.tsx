import { login } from "domain/User/api/login";
import { useMutation, useQueryClient } from "react-query";

export const useMutateLogin = () => {
  const queryClient = useQueryClient();

  return useMutation(login, {
    onSuccess: (data) => {
      queryClient.setQueryData("user", data);
      queryClient.invalidateQueries("verify");
    },
  });
};
