import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { useUser } from "domain/User/hooks";
import { FB_LOGIN_URL } from "utils/constants";

const Login = () => {
  const router = useRouter();
  const userQuery = useUser();
  useEffect(() => {
    if (userQuery.isLoading) return;
    if (userQuery.data?.data.user) router.push("/super-buy");
    window.open(FB_LOGIN_URL(), "_self");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userQuery]);
  return <div></div>;
};

export default Login;
