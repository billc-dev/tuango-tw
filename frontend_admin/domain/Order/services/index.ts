import { IOrder } from "../types";

export const getCompletedOrdersSum = (orders?: IOrder[]) => {
  if (!orders) return 0;
  let sum = 0;
  for (let order of orders) {
    for (let item of order.order) {
      if (item.status === "completed") {
        sum += Number(item.price) * Number(item.qty);
      }
    }
  }
  return sum;
};
