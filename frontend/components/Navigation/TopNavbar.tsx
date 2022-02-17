import IconButton from "components/Button/IconButton";
import LineLoginButton from "components/Button/LineLoginButton";
import ThemeButton from "components/Button/ThemeButton";
import CardAvatar from "components/Card/CardAvatar";
import { useIsVerified, useUser } from "domain/User/hooks";
import { useRouter } from "next/router";
import React from "react";

const TopNavbar = () => {
  const { data, isLoading } = useUser();
  const isVerified = useIsVerified();
  const router = useRouter();
  return (
    <div className="sticky top-0 z-10 bg-white py-1 px-1 shadow-md dark:bg-zinc-800">
      <div className="nav-wrapper m-auto flex items-center justify-between py-1">
        <div className="pl-2">
          {!isVerified.isLoading && !isLoading && (
            <>
              {data?.data.user ? (
                <IconButton
                  avatar={
                    <CardAvatar
                      alt={data.data.user.displayName}
                      img={data.data.user.pictureUrl}
                    />
                  }
                  onClick={() => router.push("/user")}
                />
              ) : (
                <LineLoginButton size="lg" />
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
