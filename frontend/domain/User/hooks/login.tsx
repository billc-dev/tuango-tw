import { login } from "domain/User/api/login";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";

export function useGetCode() {
  let code;
  if (typeof window !== "undefined") {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    code = urlParams.get("code");
  }
  return code;
}

export const useMutateLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation(login, {
    onSuccess: (data) => {
      queryClient.setQueryData("user", data);
      queryClient.invalidateQueries("verify");
      router.push("/posts");
    },
  });
};
