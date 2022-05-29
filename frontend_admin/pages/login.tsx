import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import LineLoginButton from "components/Button/LineLoginButton";
import { useIsVerified } from "domain/User/hooks";

const Login: NextPage = () => {
  const router = useRouter();
  const verifiedQuery = useIsVerified();

  useEffect(() => {
    if (!verifiedQuery.data?.data.authenticated) return;
    router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verifiedQuery.data?.data.authenticated]);
  return (
    <div>
      <Head>
        <title>登入 - 開心團購後台</title>
      </Head>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="-my-8 mx-auto z-0" alt="logo" src="/logo.png" />
      <LineLoginButton className="mx-auto z-10" size="xl" text="用LINE登入" />
    </div>
  );
};

export default Login;
