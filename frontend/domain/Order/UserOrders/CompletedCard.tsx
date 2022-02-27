import React, { FC } from "react";

import { useRouter } from "next/router";

import Card from "components/Card";
import { getFullDateFromNow } from "services/date";

import { IComplete } from "../types/complete";

interface Props {
  complete: IComplete;
}

const CompletedCard: FC<Props> = ({ complete }) => {
  const router = useRouter();
  return (
    <Card className="shadow m-2 px-4 py-2">
      <p className="pb-2 border-b-[1px] border-zinc-400">
        {getFullDateFromNow(complete.createdAt)}
      </p>
      {complete.orders.map((order) => (
        <div
          key={order.orderId}
          className="text-sm pt-1 cursor-pointer"
          onClick={() =>
            router.push(
              {
                query: {
                  ...router.query,
                  postId: order.postId,
                  action: "order",
                },
              },
              undefined,
              { shallow: true }
            )
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
