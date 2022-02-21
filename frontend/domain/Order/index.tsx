import React, { FC, useEffect } from "react";

import { useImmer } from "use-immer";

import { IPost } from "../Post/types";
import OrderForm from "./OrderForm";
import OrderList from "./OrderList";
import { getInitialOrderForm } from "./services";
import { IOrderForm } from "./types";

interface Props {
  post: IPost;
  action: "order" | "comment";
}

const Order: FC<Props> = ({ post, action }) => {
  const [orderForm, setOrderForm] = useImmer<IOrderForm>(
    getInitialOrderForm(post)
  );

  useEffect(() => {
    setOrderForm((draft) => {
      draft.items?.forEach((item) => {
        const index = post.items.findIndex((i) => i._id === item._id);
        if (index < 0) return;
        item.itemQty = post.items[index].itemQty;
        item.qty = Math.min(post.items[index].itemQty, item.qty);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  return action === "order" ? (
    <>
      <OrderList postId={post._id} />
      <OrderForm orderForm={orderForm} setOrderForm={setOrderForm} />
    </>
  ) : null;
};

export default Order;
