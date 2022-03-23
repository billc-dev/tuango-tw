import { useRouter } from "next/router";
import React, { FC } from "react";
import { useState } from "react";

import { DocumentDuplicateIcon } from "@heroicons/react/outline";
import toast from "react-hot-toast";

import Button from "components/Button";
import Card from "components/Card";
import { shallowPush } from "utils/routing";

import { IOrder } from "../types";

interface Props {
  order: IOrder;
}

const ExtraCard: FC<Props> = ({ order }) => {
  const router = useRouter();
  const { postNum, title, sellerDisplayName, imageUrl } = order;
  const itemList = () =>
    order.order.reduce(
      (list, item) =>
        list + `${item.id}.${item.item}+${item.qty} 單價$${item.price}\n`,
      ""
    );
  const handleOpenDialog = () => shallowPush(router, { postId: order.postId });

  return (
    <Card className="pr-2 grid grid-cols-3 gap-2 shadow-lg bg-white ring-1 ring-zinc-200 dark:ring-0">
      <div
        className="col-span-1 m-auto cursor-pointer"
        onClick={handleOpenDialog}
      >
        <img src={imageUrl} />
      </div>
      <div className="col-span-2 my-auto">
        <p className="text-sm cursor-pointer" onClick={handleOpenDialog}>
          😍🛒#{postNum} {title} #{sellerDisplayName}
        </p>
        <p
          className="text-sm cursor-pointer text-zinc-500 dark:text-zinc-400"
          onClick={handleOpenDialog}
        >
          {order.order.map((order, index) => {
            return (
              <div key={order.id + index}>
                {order.id}.{order.item}+{order.qty} 單價{"$"}
                {order.price}
              </div>
            );
          })}
        </p>
        <Button
          fullWidth
          className="my-2"
          icon={<DocumentDuplicateIcon />}
          onClick={() => {
            navigator.clipboard.writeText(
              `😍🛒#${postNum} ${title} #${sellerDisplayName}\n${itemList()}`
            );
            toast.success("已複製貼文連結！");
          }}
        >
          複製
        </Button>
      </div>
    </Card>
  );
};

export default ExtraCard;
