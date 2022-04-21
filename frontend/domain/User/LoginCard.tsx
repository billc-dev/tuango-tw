import React from "react";

import LineLoginButton from "components/Button/LineLoginButton";

const LoginCard = () => {
  return (
    <div className="flex h-24 w-full items-center justify-center rounded-xl bg-zinc-100 p-4 dark:bg-zinc-800">
      <LineLoginButton size="lg" text="用LINE登入" />
    </div>
  );
};

export default LoginCard;
