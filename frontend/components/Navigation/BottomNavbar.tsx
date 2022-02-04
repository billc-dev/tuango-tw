import { useRouter } from "next/router";
import React from "react";

const BottomNavbar = () => {
  const router = useRouter();
  if (router.query.id) return null;
  return (
    <div className="pt-14">
      <div className="fixed inset-x-0 bottom-0 block rounded-t-2xl bg-white p-3 dark:bg-zinc-800">
        bottom navbar
      </div>
    </div>
  );
};

export default BottomNavbar;
