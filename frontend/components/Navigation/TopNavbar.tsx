import ThemeToggle from "components/ThemeToggle";
import React from "react";

const TopNavbar = () => {
  return (
    <div className="sticky top-0 flex h-14 items-center bg-white p-3 shadow-md dark:bg-zinc-800">
      top navbar
      <ThemeToggle />
    </div>
  );
};

export default TopNavbar;
