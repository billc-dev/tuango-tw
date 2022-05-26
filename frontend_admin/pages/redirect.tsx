import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import toast from "react-hot-toast";
import { shallowPush } from "utils";

import AnimatedSpinner from "components/svg/AnimatedSpinner";
import { useMe, useMutateLogin } from "domain/User/hooks";
import { LINE_REDIRECT_URL, getCode } from "domain/User/services";

const Redirect: NextPage = () => {
  const code = getCode();
  const router = useRouter();
  const login = useMutateLogin();
  const meQuery = useMe();
  const user = meQuery?.data?.data.user;

  useEffect(() => {
    if (!router.isReady) return;
    if (typeof window !== "undefined" && code) {
      const url = LINE_REDIRECT_URL;
      login.mutate(
        { code, url },
        {
          onSuccess: () => {
            toast.success("登入成功！", { id: "login" });
            router.push("/posts");
          },
          onError: () => {
            toast.error("登入失敗！請再試一次", { id: "login" });
            shallowPush(router, {});
          },
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <div className="flex items-center justify-center pt-14 text-2xl">
      {login.isLoading && (
        <>
          <AnimatedSpinner />
          <span className="pl-2">登入中...</span>
        </>
      )}
      {login.isError && !user && "請重新登入"}
    </div>
  );
};

export default Redirect;
