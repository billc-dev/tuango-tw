import React from "react";

import { IOrder } from "domain/Order/types";
import { IPost } from "domain/Post/types";

import { IDeliver } from "../types";

export const getAmounts = (deliver: IDeliver) => {
  const { normalTotal, normalFee, extraTotal, extraFee } = deliver;
  return { normalTotal, normalFee, extraTotal, extraFee };
};

export const useHandleEditOrders = (
  setOrder: React.Dispatch<React.SetStateAction<IOrder>>
) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setOrder((order) => ({ ...order, [name]: value }));
  };
  const handleItemChange = (index: number) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setOrder((order) => {
        const orderItems = order.order.map((item, idx) => {
          if (index !== idx) return item;
          return { ...item, [name]: value };
        });
        return { ...order, order: orderItems };
      });
    };
  };
  const handleItemHasName = (index: number) => {
    return () => {
      setOrder((order) => {
        const orderItems = order.order.map((item, idx) => {
          if (index !== idx) return item;
          return { ...item, hasName: !item.hasName };
        });
        return { ...order, order: orderItems };
      });
    };
  };
  return { handleChange, handleItemChange, handleItemHasName };
};

export const useDeliverSum = (post: IPost, orders?: IOrder[]) => {
  let normalItems = post.items.map((item) => ({
    ...item,
    qty: 0,
    amount: 0,
  }));
  let extraItems = post.items.map((item) => ({ ...item, qty: 0, amount: 0 }));
  let totalItems = post.items.map((item) => ({ ...item, qty: 0, amount: 0 }));
  if (!orders) return;
  for (const order of orders) {
    for (const item of order.order) {
      if (item.status !== "delivered") continue;
      if (order.userId !== "extra") {
        const index = normalItems.findIndex((i) => i.id === item.id);
        if (index === -1) continue;
        normalItems[index].qty += Number(item.qty);
        normalItems[index].amount += Number(item.qty * item.price);
      } else {
        const index = extraItems.findIndex((i) => i.id === item.id);
        if (index === -1) continue;
        extraItems[index].qty += Number(item.qty);
        extraItems[index].amount += Number(item.qty * item.price);
      }
      const index = totalItems.findIndex((i) => i.id === item.id);
      if (index === -1) continue;
      totalItems[index].qty += Number(item.qty);
      totalItems[index].amount += Number(item.qty * item.price);
    }
  }
  const normalItemSum = normalItems.reduce((sum, item) => sum + item.amount, 0);
  const extraItemSum = extraItems.reduce((sum, item) => sum + item.amount, 0);
  const totalItemSum = totalItems.reduce((sum, item) => sum + item.amount, 0);
  return {
    normalItems,
    extraItems,
    totalItems,
    normalItemSum,
    extraItemSum,
    totalItemSum,
  };
};
