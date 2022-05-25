import type { NextPage } from "next";
import Head from "next/head";

import LineLoginButton from "components/Button/LineLoginButton";

const Login: NextPage = () => {
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
