import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { InformationCircleIcon, ViewListIcon } from "@heroicons/react/outline";
import { PlayIcon } from "@heroicons/react/solid";

import Button from "components/Button";
import SquareButton from "components/Button/SquareButton";

const list = [
  { text: "總覽", icon: <ViewListIcon />, route: "overview" },
  { text: "送貨步驟", icon: <InformationCircleIcon />, route: "deliver" },
  //   { text: "問與答", icon: <ChatAltIcon />, route: "comment" },
];

const Seller = () => {
  const router = useRouter();
  return (
    <>
      <Link href="https://youtu.be/2mUnxNQbQiM" passHref>
        <Button
          icon={<PlayIcon />}
          fullWidth
          variant="danger"
          className="mt-2 max-w-xs mx-auto"
        >
          賣家使用教學
        </Button>
      </Link>
      <div className="grid grid-cols-2 px-4 max-w-xs mx-auto select-none">
        {list.map((item, index) => (
          <SquareButton
            key={index}
            Icon={item.icon}
            text={item.text}
            onClick={() => router.push(`/seller/${item.route}`)}
          />
        ))}
      </div>
    </>
  );
};

export default Seller;
