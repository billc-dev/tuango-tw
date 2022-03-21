import type { NextPage } from "next";
import { useRouter } from "next/router";

import {
  BriefcaseIcon,
  CheckIcon,
  SearchIcon,
  TruckIcon,
  XIcon,
} from "@heroicons/react/outline";
import { HeartIcon } from "@heroicons/react/solid";

import SquareButton from "components/Button/SquareButton";
import PlusIcon from "components/svg/PlusIcon";

const list = [
  { text: "已喜歡", icon: <HeartIcon />, route: "liked" },
  { text: "已下訂", icon: <PlusIcon />, route: "ordered" },
  { text: "已到貨", icon: <TruckIcon />, route: "delivered" },
  { text: "已取貨", icon: <CheckIcon />, route: "completed" },
  { text: "尋貨中", icon: <SearchIcon />, route: "missing" },
  { text: "已取消", icon: <XIcon />, route: "canceled" },
];

const Orders: NextPage = () => {
  const router = useRouter();
  return (
    <>
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
      <div className="grid grid-cols-2 px-4 max-w-xs mx-auto select-none">
        {list.map((item, index) => (
          <SquareButton
            key={index}
            Icon={item.icon}
            text={item.text}
            onClick={() => router.push(`/orders/${item.route}`)}
          />
        ))}
      </div>
    </>
  );
};

export default Orders;
