import type { NextPage } from "next";

import LineLoginButton from "components/Button/LineLoginButton";

const Login: NextPage = () => {
  return (
    <div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="-my-8 mx-auto z-0" alt="logo" src="/logo.png" />
      <LineLoginButton className="mx-auto z-10" size="xl" text="用LINE登入" />
    </div>
  );
};

export default Login;
