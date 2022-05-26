import React, { FC } from "react";

import Card from "components/Card";

import { IOrder } from "../types";

interface Props {
  order: IOrder;
  setOrder: React.Dispatch<React.SetStateAction<IOrder | undefined>>;
}

const ExtraOrderCard: FC<Props> = ({ order, setOrder }) => {
  const { postNum, title, sellerDisplayName, imageUrl } = order;

  return (
    <Card
      className="pr-2 grid grid-cols-4 gap-2 shadow hover:shadow-lg transition-shadow bg-white ring-1 ring-zinc-200 dark:ring-0"
      onClick={() => setOrder(order)}
    >
      <div
        className="col-span-1 m-auto cursor-pointer"
        // onClick={handleOpenDialog}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="product" src={imageUrl} />
      </div>
      <div className="col-span-3 my-auto pt-2">
        <p className="text-sm cursor-pointer">
          😍🛒#{postNum} {title} #{sellerDisplayName}
        </p>
        <div className="text-sm cursor-pointer text-zinc-500 dark:text-zinc-400">
          {order.order.map((order, index) => (
            <p key={order.id + index}>
              {order.id}.{order.item}+{order.qty} 單價{"$"}
              {order.price}
              {order.location && `📍${order.location}`}
            </p>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ExtraOrderCard;
