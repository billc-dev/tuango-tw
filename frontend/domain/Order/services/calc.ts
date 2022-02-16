import { IOrderItem } from "../types";

export const getOrderSum = (items?: IOrderItem[]) => {
  if (!items) return 0;
  return items.reduce((sum, item) => sum + item.qty * item.price, 0);
};
