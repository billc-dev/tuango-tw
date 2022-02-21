import { useMutation, useQueryClient } from "react-query";

import { login } from "domain/User/api/login";
import { setAccessToken } from "domain/User/services/accessToken";

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
