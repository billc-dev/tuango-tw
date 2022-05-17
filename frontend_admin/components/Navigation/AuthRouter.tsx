import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";

import { useIsAuthenticated, useIsVerified } from "domain/User/hooks";

interface Props {
  children?: React.ReactNode;
}

const AuthRouter: FC<Props> = ({ children }) => {
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();
  const isVerified = useIsVerified();

  const isAuthRoute =
    router.pathname === "/login" || router.pathname === "/redirect";

  useEffect(() => {
    if (isVerified.isLoading) return;
    if (isVerified.data?.data.authenticated === false) {
      if (router.pathname === "/redirect") return;
      router.push("/login");
      return;
    }
    if (isAuthenticated && isAuthRoute) {
      router.push("/posts");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isVerified.isLoading, isAuthRoute]);

  if (isAuthRoute) return <>{children}</>;
  if (!isAuthenticated) return null;
  return <>{children}</>;
};

export default AuthRouter;
