import React, { useEffect, useState } from "react";

import LineLoginButton from "components/Button/LineLoginButton";
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
    <NormalDialog title="開心團購" {...{ open, setOpen }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="-my-8" alt="logo" src="/android-chrome-512x512.png" />
      <LineLoginButton
        size="lg"
        text="用LINE登入"
        className="w-full mb-8 py-6"
      />
    </NormalDialog>
  );
};

export default LoginDialog;
