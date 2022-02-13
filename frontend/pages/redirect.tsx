import {
  getRedirectUrl,
  useGetCode,
  useMutateLogin,
  useUser,
} from "domain/User/hooks";
import { REDIRECT_URL } from "domain/User/urls";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Redirect: NextPage = () => {
  const code = useGetCode();
  const router = useRouter();
  const login = useMutateLogin();
  const userQuery = useUser();
  const user = userQuery?.data?.data.user;

  useEffect(() => {
    if (typeof window !== "undefined" && code) {
      const url = getRedirectUrl()
        ? `${REDIRECT_URL}?redirect=${getRedirectUrl()}`
        : REDIRECT_URL;

      login.mutate({ code, url });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  useEffect(() => {
    if (user) router.push("/posts");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="flex items-center justify-center pt-14 text-2xl">
      {login.isLoading && "登入中..."}
      {login.isError && !user && "請重新登入"}
    </div>
  );
};

export default Redirect;
