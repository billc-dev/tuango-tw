import React from "react";

import { useIsVerified, useUser } from "./hooks";
import { LINE_LOGIN_URL_WITH_PARAMS } from "./services";

const LoginOverlay = () => {
  const verifiedQuery = useIsVerified();
  const userQuery = useUser();

  const handleClick = () => {
    if (verifiedQuery.isLoading || userQuery.isLoading) return;
    if (!userQuery.data?.data.user) {
      window.open(
        LINE_LOGIN_URL_WITH_PARAMS(`?redirect=${window.location.href}`),
        "_self"
      );
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
