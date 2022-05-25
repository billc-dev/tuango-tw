import React, { useEffect, useState } from "react";

import FBLoginButton from "components/Button/FBLoginButton";
import NormalDialog from "components/Dialog/NormalDialog";

import { useIsVerified, useUser } from "./hooks";

const LoginDialog = () => {
  const verifiedQuery = useIsVerified();
  const userQuery = useUser();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (verifiedQuery.isLoading || userQuery.isLoading) return;
    if (!userQuery.data?.data.user) setOpen(true);
  }, [verifiedQuery.isLoading, userQuery.isLoading, userQuery.data?.data.user]);
  return (
    <NormalDialog title="" {...{ open, setOpen }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <FBLoginButton size="lg" text="用FB登入" className="w-full py-6" />
    </NormalDialog>
  );
};

export default LoginDialog;
