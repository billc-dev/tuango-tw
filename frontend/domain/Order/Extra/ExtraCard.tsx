import { useRouter } from "next/router";
import React, { FC } from "react";

import { DocumentDuplicateIcon } from "@heroicons/react/outline";
import copy from "copy-to-clipboard";
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
    <Card className="pr-2 grid grid-cols-3 gap-2 shadow hover:shadow-lg transition-shadow bg-white ring-1 ring-zinc-200 dark:ring-0">
      <div
        className="col-span-1 m-auto cursor-pointer"
        onClick={handleOpenDialog}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="product" src={imageUrl} />
      </div>
      <div className="col-span-2 my-auto pt-2">
        <p className="text-sm cursor-pointer" onClick={handleOpenDialog}>
          😍🛒#{postNum} {title} #{sellerDisplayName}
        </p>
        <div
          className="text-sm cursor-pointer text-zinc-500 dark:text-zinc-400"
          onClick={handleOpenDialog}
        >
          {order.order.map((order, index) => (
            <p key={order.id + index}>
              {order.id}.{order.item}+{order.qty} 單價{"$"}
              {order.price}
              {order.location && `📍${order.location}`}
            </p>
          ))}
        </div>
        <Button
          fullWidth
          className="my-2"
          icon={<DocumentDuplicateIcon />}
          onClick={() => {
            copy(
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
