import { IOrder, OrderStatus } from "../types";

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

export const getOrderStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case "ordered":
      return "已下訂 🦓";
    case "delivered":
      return "已到貨 🚚";
    case "completed":
      return "已取貨 ✅";
    case "missing":
      return "尋貨中 🔍";
    case "canceled":
      return "已取消 ❌";
    default:
      return "";
  }
};
