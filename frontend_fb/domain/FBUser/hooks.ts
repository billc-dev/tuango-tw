import { useMutation, useQueryClient } from "react-query";

import { setAccessToken } from "domain/User/services/accessToken";

import { fbLogin } from "./api";

export const useMutateFBLogin = () => {
  const queryClient = useQueryClient();

  return useMutation(fbLogin, {
    onSuccess: ({ data }) => {
      setAccessToken(data.accessToken);
      queryClient.setQueryData("user", { data });
      queryClient.invalidateQueries("verify");
    },
  });
};
