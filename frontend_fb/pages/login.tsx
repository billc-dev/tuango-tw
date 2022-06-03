import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { useIsVerified, useUser } from "domain/User/hooks";
import { FB_LOGIN_URL } from "utils/constants";

const Login = () => {
  const router = useRouter();
  const isVerified = useIsVerified();
  const userQuery = useUser();

  useEffect(() => {
    if (isVerified.isLoading) return;
    if (userQuery.data?.data.user) {
      router.push("/super-buy");
      return;
    }
    window.open(FB_LOGIN_URL(), "_self");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVerified, userQuery]);
  return <div></div>;
};

export default Login;
