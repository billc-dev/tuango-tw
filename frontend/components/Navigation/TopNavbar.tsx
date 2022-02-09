import ThemeButton from "components/Button/ThemeButton";
import { useUser } from "domain/User/hooks";
import React from "react";

const TopNavbar = () => {
  const { data, isError } = useUser();
  console.log(data, isError);

  return (
    <div className="sticky top-0 z-10 flex h-14 items-center bg-white p-3 shadow-md dark:bg-zinc-800">
      top navbar
      <ThemeButton />
      {/* {data?.user.displayName} */}
      {/* {!isError && data?.data.} */}
    </div>
  );
};

export default TopNavbar;
