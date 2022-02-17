import LineLoginButton from "components/Button/LineLoginButton";
import React from "react";

const LoginCard = () => {
  return (
    <div className="flex h-24 w-full items-center justify-center rounded-xl bg-zinc-100 p-4 dark:bg-zinc-800">
      <LineLoginButton size="lg" />
    </div>
  );
};

export default LoginCard;
