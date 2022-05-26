import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { useQueryClient } from "react-query";

import FBLoginButton from "components/Button/FBLoginButton";
import IconButton from "components/Button/IconButton";
import ThemeButton from "components/Button/ThemeButton";
import CardAvatar from "components/Card/CardAvatar";
import { useIsVerified, useUser } from "domain/User/hooks";
import { getLocalStorageUser } from "domain/User/services";

const TopNavbar = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, refetch } = useUser();
  const isVerified = useIsVerified();
  const router = useRouter();
  useEffect(() => {
    const user = getLocalStorageUser();
    if (!user) return;
    queryClient.setQueryData("user", user);
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="sticky top-0 h-14 z-10 select-none bg-white py-1 px-1 shadow-md dark:bg-zinc-800">
      <div className="max-w-4xl m-auto flex items-center justify-between py-1">
        <div className="pl-2">
          {!isVerified.isLoading && !isLoading && (
            <>
              {data?.data.user ? (
                <div className="flex justify-center items-center">
                  <IconButton
                    avatar={
                      <CardAvatar
                        alt={data.data.user.displayName}
                        img={data.data.user.pictureUrl}
                      />
                    }
                    onClick={() => router.push("/user")}
                  />
                  <p className="ml-2">會員編號: {data.data.user.pickupNum}</p>
                </div>
              ) : (
                <FBLoginButton size="lg" />
              )}
            </>
          )}
        </div>
        <div className="flex items-center justify-center pr-2">
          <ThemeButton />
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
