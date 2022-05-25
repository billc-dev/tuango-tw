import dynamic from "next/dynamic";
import React from "react";

import { useUser } from "domain/User/hooks";

const MessengerSetup = dynamic(
  () => import("../FBUser/MessengerSetup")
) as () => JSX.Element;

const Auth = () => {
  const userQuery = useUser();
  return (
    <>
      {userQuery.data && userQuery.data.data.user.status === "registered" && (
        <MessengerSetup />
      )}
    </>
  );
};

export default Auth;
