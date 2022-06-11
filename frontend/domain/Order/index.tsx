import React, { FC, useEffect, useState } from "react";

import { Action, IPost } from "../Post/types";
import OrderForm from "./OrderForm";
import OrderList from "./OrderList";
import { getInitialOrderForm } from "./services";
import { IOrderForm } from "./types";

interface Props {
  post: IPost;
  action: Action;
}

const Order: FC<Props> = ({ post, action }) => {
  const [orderForm, setOrderForm] = useState<IOrderForm>(
    getInitialOrderForm(post)
  );

  useEffect(() => {
    setOrderForm((orderForm) => {
      if (!orderForm.items) return orderForm;
      const items = orderForm.items.map((item) => {
        const index = post.items.findIndex((i) => i.id === item.id);
        if (index === -1) return item;
        return {
          ...item,
          itemQty: post.items[index].itemQty,
          qty: Math.min(post.items[index].itemQty, item.qty),
        };
      });
      return { ...orderForm, items };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.items]);

  return action === "order" || !action ? (
    <>
      {post.status !== "completed" && <OrderList postId={post._id} />}
      {post.status === "open" && (
        <OrderForm
          post={post}
          orderForm={orderForm}
          setOrderForm={setOrderForm}
        />
      )}
    </>
  ) : null;
};

export default Order;
