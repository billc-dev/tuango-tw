import { login } from "domain/User/api/login";
import { setAccessToken } from "domain/User/services/accessToken";
import { useMutation, useQueryClient } from "react-query";

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
