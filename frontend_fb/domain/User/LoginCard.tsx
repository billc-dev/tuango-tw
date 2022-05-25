import React from "react";

import FBLoginButton from "components/Button/FBLoginButton";

const LoginCard = () => {
  return (
    <div className="flex h-24 w-full items-center justify-center rounded-xl bg-zinc-100 p-4 dark:bg-zinc-800">
      <FBLoginButton size="lg" text="用FB登入" />
    </div>
  );
};

export default LoginCard;
