import produce from "immer";
import { Updater } from "use-immer";
import { ValidationError } from "yup";

import * as gtag from "domain/GoogleAnalytics/gtag";
import { IPost } from "domain/Post/types";

import { orderFormSchema } from "../schema";
import { IOrder, IOrderForm, IOrderItem } from "../types";

type HandleChangeItemQty = (
  amount: number,
  index: number,
  id: string,
  setOrderForm: Updater<IOrderForm>
) => void;

export const handleChangeItemQty: HandleChangeItemQty = (
  amount,
  index,
  id,
  setOrderForm
) => {
  setOrderForm((draft) => {
    if (!draft.items) return;
    if (draft.items[index].id !== id) return;
    draft.items[index].qty += amount;
    const items: Gtag.Item[] = [
      {
        id: `${draft.postId}-${id}`,
        name: draft.items[index].item,
        quantity: 1,
        price: draft.items[index].price,
      },
    ];
    if (amount === 1) gtag.event("add_to_cart", { items });
    else if (amount === -1) gtag.event("remove_from_cart", { items });
  });
};

export const validateOrder = async (orderForm: IOrderForm) => {
  const cleanedOrderForm = produce(orderForm, (draft) => {
    if (!draft.items) return;
    draft.items = draft.items.filter((item) => item.qty > 0);
  });

  try {
    return await orderFormSchema.validate(cleanedOrderForm, {
      abortEarly: true,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log(error.errors);
    }
  }
};

export const getInitialOrderForm = (post: IPost) => {
  return {
    postId: post._id,
    items: post.items.map((item) => ({
      _id: item._id,
      id: item.id,
      item: item.item,
      price: item.price,
      itemQty: item.itemQty,
      qty: 0,
    })),
    comment: "",
  };
};

export const getOrderSum = (items?: IOrderItem[]) => {
  if (!items) return 0;
  return items.reduce((sum, item) => sum + item.qty * item.price, 0);
};

export const calcSumOrders = (post: IPost, orders: IOrder[]) => {
  const orderArray = post.items.map((item) => ({
    id: item.id,
    item: item.item,
    qty: 0,
    amount: 0,
  }));
  orders.forEach((order) => {
    order.order.forEach((i) => {
      const index = orderArray.findIndex((item) => item.id === i.id);
      orderArray[index].qty += i.qty * 1;
      orderArray[index].amount += i.qty * 1 * i.price * 1;
    });
  });
  return orderArray.filter((item) => item.qty !== 0);
};
