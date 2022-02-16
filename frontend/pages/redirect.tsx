import { useMutateLogin, useUser } from "domain/User/hooks";
import { getCode, getRedirectUrl } from "domain/User/services";
import { LINE_REDIRECT_URL } from "domain/User/services/urls";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Redirect: NextPage = () => {
  const code = getCode();
  const router = useRouter();
  const login = useMutateLogin();
  const userQuery = useUser();
  const user = userQuery?.data?.data.user;

  useEffect(() => {
    if (typeof window !== "undefined" && code) {
      const url = `${LINE_REDIRECT_URL}?redirect=${getRedirectUrl()}`;
      toast.promise(
        login.mutateAsync(
          { code, url },
          {
            onSuccess: () => {
              const previousUrl = getRedirectUrl();
              if (previousUrl) router.push(previousUrl);
              else router.push("/posts");
            },
          }
        ),
        {
          loading: "登入中...",
          success: "登入成功！",
          error: "登入失敗！",
        }
      );
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
