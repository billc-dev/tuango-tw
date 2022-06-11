import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import toast from "react-hot-toast";

import AnimatedSpinner from "components/svg/AnimatedSpinner";
import { useMutateFBLogin } from "domain/FBUser/hooks";
import { WINDOW_URL } from "utils/constants";
import { shallowPush } from "utils/routing";

const Redirect: NextPage = () => {
  const router = useRouter();
  const fbLogin = useMutateFBLogin();

  useEffect(() => {
    if (!router.isReady) return;
    if (fbLogin.isLoading) return;
    const { code } = router.query;
    if (typeof code !== "string") return;

    fbLogin.mutate(
      { code, redirect_uri: `${WINDOW_URL}/redirect` },
      {
        onSuccess: () => {
          toast.success("登入成功！", { id: "login" });
          const next = localStorage.getItem("next");
          if (!next) router.push("/posts");
          else router.push(next);
        },
        onError: () => {
          toast.error("登入失敗！請再試一次", { id: "login" });
        },
        onSettled: () => {
          const { code, redirect_uri, state, ...query } = router.query;
          shallowPush(router, query);
        },
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return (
    <div className="flex items-center justify-center pt-14 text-2xl">
      {fbLogin.isLoading && (
        <>
          <AnimatedSpinner />
          <span className="pl-2">登入中...</span>
        </>
      )}
      {/* {fbLogin.isError && !user && "請重新登入"} */}
    </div>
  );
};

export default Redirect;
