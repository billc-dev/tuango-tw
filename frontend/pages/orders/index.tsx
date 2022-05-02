import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import {
  BriefcaseIcon,
  CheckIcon,
  SearchIcon,
  TruckIcon,
  XIcon,
} from "@heroicons/react/outline";
import { HeartIcon } from "@heroicons/react/solid";
import { useQueryClient } from "react-query";

import SquareButton from "components/Button/SquareButton";
import PlusIcon from "components/svg/PlusIcon";
import LoginOverlay from "domain/User/LoginOverlay";
import { useDeliveredOrderCount, useIsSeller } from "domain/User/hooks";
import { isClient } from "utils/constants";

const list = [
  { text: "已喜歡", icon: <HeartIcon />, route: "liked" },
  { text: "已下訂", icon: <PlusIcon />, route: "ordered" },
  { text: "已到貨", icon: <TruckIcon />, route: "delivered" },
  { text: "已取貨", icon: <CheckIcon />, route: "completed" },
  { text: "尋貨中", icon: <SearchIcon />, route: "missing" },
  { text: "已取消", icon: <XIcon />, route: "canceled" },
];

const Orders: NextPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const isSeller = useIsSeller();
  const orderCountQuery = useDeliveredOrderCount();
  useEffect(() => {
    queryClient.invalidateQueries("deliveredOrderCount");
    queryClient.invalidateQueries("notificationCount");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <LoginOverlay />
      {isClient && isSeller && (
        <div className="grid justify-center select-none">
          <button
            type="button"
            className="flex shadow items-center rounded-lg bg-zinc-300 dark:bg-zinc-700 w-56 p-4 my-4 active:bg-zinc-500 dark:active:bg-zinc-800 transition"
            onClick={() => router.push("/seller")}
          >
            <BriefcaseIcon className="h-12 w-12 text-white" />
            <p className="pl-4 text-3xl">賣家管理</p>
          </button>
        </div>
      )}
      <div className="grid grid-cols-2 px-4 max-w-xs md:max-w-md mx-auto select-none">
        {list.map((item, index) => (
          <SquareButton
            key={index}
            Icon={item.icon}
            text={item.text}
            onClick={() => router.push(`/orders/${item.route}`)}
          >
            {item.route === "delivered" && !!orderCountQuery.data?.orderCount && (
              <div className="absolute top-1 right-3 rounded-full bg-red-600 text-xl text-white">
                <div className="mx-4 my-2">
                  {orderCountQuery.data.orderCount}
                </div>
              </div>
            )}
          </SquareButton>
        ))}
      </div>
    </>
  );
};

export default Orders;
