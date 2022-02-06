import Card from "components/Core/Card";
import React, { FC } from "react";
import { Item } from "types";
import { PlusIcon, MinusIcon } from "@heroicons/react/outline";
import OrderList from "./OrderList";

interface Props {
  postId: string;
  items: Item[];
}

const Orders: FC<Props> = ({ postId, items }) => {
  return (
    <>
      <OrderList postId={postId} />
      <Card>
        <div className="flex flex-col items-center justify-center p-3">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex flex-col items-center justify-center"
            >
              {`${item.id}.${item.item} $${item.price}`}
              <div className="flex items-center justify-center">
                <button className="rounded-full p-3 hover:bg-zinc-300">
                  <MinusIcon className="h-6 w-6" />
                </button>
                <div className="px-2">{0}</div>
                <button className="rounded-full p-3 hover:bg-zinc-300">
                  <PlusIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
};

export default Orders;
