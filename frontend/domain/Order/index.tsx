import React, { FC } from "react";
import { Item } from "../Post/post";
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
