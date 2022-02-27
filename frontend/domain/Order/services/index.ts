import produce from "immer";
import { Updater } from "use-immer";
import { ValidationError } from "yup";

import { IPost } from "domain/Post/types";

import { orderFormSchema } from "../schema";
import { IOrderForm, IOrderItem } from "../types";

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
