import { login } from "api/login";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";

export const useMutateLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, AxiosError, { code: string; url: string }>(
    login,
    {
      onSuccess: (data) => {
        queryClient.setQueryData("user", data.data.user);
        router.push("/posts");
      },
    }
  );
};
