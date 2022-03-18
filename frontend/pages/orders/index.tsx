import type { NextPage } from "next";
import { useRouter } from "next/router";

import {
  CheckIcon,
  SearchIcon,
  TruckIcon,
  XIcon,
} from "@heroicons/react/outline";
import { HeartIcon } from "@heroicons/react/solid";

import SquareButton from "components/Button/SquareButton";
import PlusIcon from "components/svg/PlusIcon";

const OrderList = [
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
    <div className="grid grid-cols-2 px-4 max-w-xs mx-auto">
      {OrderList.map((item, index) => (
        <SquareButton
          key={index}
          Icon={item.icon}
          text={item.text}
          onClick={() => {
            router.push(`/orders/${item.route}`);
          }}
        />
      ))}
    </div>
  );
};

export default Orders;
