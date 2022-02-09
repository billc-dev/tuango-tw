import { login } from "domain/Login/api/login";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";

export const useMutateLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation(login, {
    onSuccess: (data) => {
      queryClient.setQueryData("user", data.data.user);
      router.push("/posts");
    },
  });
};
