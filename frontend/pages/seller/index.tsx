import { useRouter } from "next/router";
import React from "react";

import { ChatAltIcon, ViewListIcon } from "@heroicons/react/outline";

import SquareButton from "components/Button/SquareButton";

const list = [
  { text: "總覽", icon: <ViewListIcon />, route: "overview" },
  { text: "問與答", icon: <ChatAltIcon />, route: "comment" },
];

const Seller = () => {
  const router = useRouter();
  return (
    <div>
      {/* <button className="flex items-center p-4 w-full transition rounded-lg hover:bg-gray-50 focus:outline-none">
        <div className="flex p-2 items-center bg-zinc-300 rounded-lg justify-center text-white">
          <DocumentTextIcon className="h-10 w-10" />
        </div>
        <div className="ml-4">
          <p className="font-medium text-gray-900">總覽</p>
        </div>
      </button> */}
      <div className="grid grid-cols-2 px-4 max-w-xs mx-auto">
        {list.map((item, index) => (
          <SquareButton
            key={index}
            Icon={item.icon}
            text={item.text}
            onClick={() => router.push(`/seller/${item.route}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Seller;
