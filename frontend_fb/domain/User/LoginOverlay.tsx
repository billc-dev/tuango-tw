import { useRouter } from "next/router";
import React from "react";

import { FB_LOGIN_URL, isClient } from "utils/constants";

import { useIsVerified, useUser } from "./hooks";

const LoginOverlay = () => {
  const router = useRouter();
  const verifiedQuery = useIsVerified();
  const userQuery = useUser();
  const handleClick = () => {
    if (verifiedQuery.isLoading || userQuery.isLoading) return;
    if (!userQuery.data?.data.user) {
      window.open(FB_LOGIN_URL(), "_self");
      isClient && localStorage.setItem("next", router.asPath);
    }
  };
  return !userQuery.data?.data.user ? (
    <div
      className="fixed z-[5] top-0 left-0 w-screen h-screen"
      onClick={handleClick}
    />
  ) : null;
};

export default LoginOverlay;
