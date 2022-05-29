import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { useQueryClient } from "react-query";

import Button from "components/Button";
import Menu from "components/Menu";
import { useIsVerified, useMe, useMutateLogout } from "domain/User/hooks";
import { getLocalStorageUser } from "domain/User/services";

const TopNavbar = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const logout = useMutateLogout();
  const [open, setOpen] = useState(false);
  const verifiedQuery = useIsVerified();
  const { data, isLoading, refetch } = useMe();
  useEffect(() => {
    const user = getLocalStorageUser();
    if (!user) return;
    queryClient.setQueryData("me", user);
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleClick = (path: string) => {
    router.push(path);
    setOpen(false);
  };
  return (
    <div className="sticky top-0 h-14 z-10 select-none bg-white py-1 px-1 shadow-md dark:bg-zinc-800">
      {!verifiedQuery.isLoading && !isLoading && (
        <div className="flex justify-between items-center h-full ml-2">
          {data?.data.user ? (
            <>
              <div className="flex">
                <Button variant="inherit" onClick={() => router.push("/")}>
                  取貨
                </Button>
                <Button
                  variant="inherit"
                  onClick={() => router.push("/deliver")}
                >
                  進貨
                </Button>
                <Button
                  variant="inherit"
                  onClick={() => router.push("/message")}
                >
                  訊息
                </Button>
                <div className="">
                  <Button variant="inherit" onClick={() => setOpen(true)}>
                    管理
                  </Button>
                  <Menu
                    open={open}
                    handleClose={() => setOpen(false)}
                    items={[
                      {
                        text: "貼文管理",
                        onClick: () => handleClick("/posts"),
                      },
                      {
                        text: "訂單管理",
                        onClick: () => handleClick("/orders"),
                      },
                      {
                        text: "位置管理",
                        onClick: () => handleClick("/location"),
                      },
                      {
                        text: "用戶管理",
                        onClick: () => handleClick("/users"),
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="mr-2">
                <Button variant="inherit" onClick={() => logout.mutate()}>
                  登出
                </Button>
              </div>
            </>
          ) : (
            <Button variant="inherit" onClick={() => router.push("/login")}>
              登入
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default TopNavbar;
