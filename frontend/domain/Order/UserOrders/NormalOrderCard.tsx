import { useRouter } from "next/router";
import React, { FC } from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";

import Card from "components/Card";
import { getFullDateFromNow } from "services/date";
import { shallowPush } from "utils/routing";

import { IOrder } from "../types";

interface Props {
  order: IOrder;
}

const NormalOrderCard: FC<Props> = ({ order }) => {
  const sum = order.order.reduce((sum, ord) => (sum += ord.price * ord.qty), 0);
  const router = useRouter();
  return (
    <Card
      className="shadow mx-2 my-3 cursor-pointer hover:shadow-lg transition-shadow bg-white ring-1 ring-zinc-200 dark:ring-0"
      onClick={() =>
        shallowPush(router, {
          ...router.query,
          postId: order.postId,
          action: "order",
        })
      }
    >
      <div className="grid grid-cols-4">
        <div className="my-auto item col-span-1">
          <LazyLoadImage
            className="h-full w-full object-cover"
            src={order.imageUrl}
          />
        </div>
        <div className="p-2 col-span-3">
          <p className="text-sm">
            #{order.postNum} {order.title} #{order.sellerDisplayName}
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {getFullDateFromNow(order.createdAt)}
          </p>
          <div className="text-sm border-zinc-400 border-b-[1px] pb-1">
            {order.order.map((order, index) => (
              <p key={order.id + index}>
                {`${order.id}. ${order.item}+${order.qty} $${
                  order.price * order.qty
                }`}
              </p>
            ))}
          </div>
          <p className="text-sm">
            {"合計$"}
            {sum}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default NormalOrderCard;
