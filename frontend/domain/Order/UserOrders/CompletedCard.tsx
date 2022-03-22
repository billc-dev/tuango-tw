import { useRouter } from "next/router";
import React, { FC } from "react";

import Card from "components/Card";
import { getFullDateFromNow } from "services/date";
import { shallowPush } from "utils/routing";

import { IComplete } from "../types/complete";

interface Props {
  complete: IComplete;
}

const CompletedCard: FC<Props> = ({ complete }) => {
  const router = useRouter();
  return (
    <Card className="shadow mx-2 my-3 px-4 py-2 bg-white ring-1 ring-zinc-200 dark:ring-0">
      <p className="pb-2 border-b-[1px] border-zinc-400">
        {getFullDateFromNow(complete.createdAt)}
      </p>
      {complete.orders.map((order) => (
        <div
          key={order.orderId}
          className="text-sm pt-1 cursor-pointer"
          onClick={() =>
            shallowPush(router, { ...router.query, postId: order.postId })
          }
        >
          🛒 #{order.postNum} {order.title} #{order.sellerDisplayName}
          {order.order.map((orderItem, index) => (
            <p key={index} className="text-zinc-500">
              {orderItem.id}. {orderItem.item} +{orderItem.qty} $
              {orderItem.price * orderItem.qty}
            </p>
          ))}
        </div>
      ))}
      <p className="text-sm pt-2">
        {"合計$"}
        {complete.total}
      </p>
    </Card>
  );
};

export default CompletedCard;
