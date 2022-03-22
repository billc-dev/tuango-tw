import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import toast from "react-hot-toast";

import Button from "components/Button";
import { useUser } from "domain/User/hooks";
import { useMutateLogout } from "domain/User/hooks";

const User: NextPage = () => {
  const logout = useMutateLogout();
  const { data } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!data?.data.user) {
      router.push("/posts");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data.user]);
  return (
    <div className="px-2">
      <div className="pt-4">
        <Button
          fullWidth
          size="lg"
          onClick={() =>
            toast.promise(logout.mutateAsync(), {
              loading: "登出中...",
              success: "登出成功！",
              error: "登出失敗！",
            })
          }
        >
          登出
        </Button>
      </div>
    </div>
  );
};

export default User;
