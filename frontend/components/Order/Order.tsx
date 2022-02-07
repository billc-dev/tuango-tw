import Card from "components/Core/Card";
import React, { FC } from "react";
import { Item } from "types";
import { PlusIcon, MinusIcon } from "@heroicons/react/outline";
import OrderList from "./OrderList";
import OrderForm from "./OrderForm";

interface Props {
  postId: string;
  items: Item[];
}

const Orders: FC<Props> = ({ postId, items }) => {
  return (
    <>
      <OrderList postId={postId} />
      <OrderForm postId={postId} items={items} />
    </>
  );
};

export default Orders;
