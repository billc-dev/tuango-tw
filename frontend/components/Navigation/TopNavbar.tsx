import Button from "components/Button";
import LineLoginButton from "components/Button/LineLoginButton";
import ThemeButton from "components/Button/ThemeButton";
import { useIsVerified, useUser } from "domain/User/hooks";
import { useMutateLogout } from "domain/User/hooks/logout";
import React from "react";

const TopNavbar = () => {
  const { data, isError } = useUser();
  const isVerified = useIsVerified();

  const logout = useMutateLogout();
  return (
    <div className="sticky top-0 z-10 flex h-14 items-center justify-between bg-white p-3 px-1 shadow-md dark:bg-zinc-800">
      <div></div>
      <div className="flex">
        <ThemeButton />
        {isVerified.data?.data.authenticated ? (
          <Button onClick={() => logout.mutate()}>登出</Button>
        ) : (
          <LineLoginButton />
        )}
      </div>
    </div>
  );
};

export default TopNavbar;
