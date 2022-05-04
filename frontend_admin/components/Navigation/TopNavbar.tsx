import React, { useEffect } from "react";

import { useQueryClient } from "react-query";

import Button from "components/Button";
import { useMutateLogout, useUser } from "domain/User/hooks";
import { getLocalStorageUser } from "domain/User/services";

const TopNavbar = () => {
  const queryClient = useQueryClient();
  const logout = useMutateLogout();

  const { refetch } = useUser();
  useEffect(() => {
    const user = getLocalStorageUser();
    if (!user) return;
    queryClient.setQueryData("user", user);
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="sticky top-0 h-14 z-10 select-none bg-white py-1 px-1 shadow-md dark:bg-zinc-800">
      <div className="flex items-center justify-between py-1">
        <div className="pl-2">
          <Button
            onClick={() => {
              logout.mutate();
            }}
          >
            登出
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
