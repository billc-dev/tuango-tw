import React from "react";

import { useUser } from "./hooks";
import { LINE_LOGIN_URL_WITH_PARAMS } from "./services";

const LoginOverlay = () => {
  const userQuery = useUser();
  const handleClick = () => {
    if (userQuery.isLoading) return;
    window.open(
      LINE_LOGIN_URL_WITH_PARAMS(`?redirect=${window.location.href}`),
      "_self"
    );
  };
  return !userQuery.data?.data.user ? (
    <div
      className="fixed top-0 left-0 w-screen h-screen"
      onClick={handleClick}
    />
  ) : null;
};

export default LoginOverlay;
