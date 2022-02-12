import Button from "components/Button";
import ThemeButton from "components/Button/ThemeButton";
import { useUser } from "domain/User/hooks";
import { useMutateLogout } from "domain/User/hooks/logout";
import React from "react";

const TopNavbar = () => {
  const { data, isError } = useUser();
  const logout = useMutateLogout();
  return (
    <div className="sticky top-0 z-10 flex h-14 items-center bg-white p-3 shadow-md dark:bg-zinc-800">
      top navbar
      <ThemeButton />
      <Button onClick={() => logout.mutate()}>Logout</Button>
      {data?.data.user.displayName}
    </div>
  );
};

export default TopNavbar;
