import Button from "components/Button";
import { useUser } from "domain/User/hooks";
import { useMutateLogout } from "domain/User/hooks/logout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

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
        <Button fullWidth size="lg" type="gray" onClick={() => logout.mutate()}>
          登出
        </Button>
      </div>
    </div>
  );
};

export default User;
