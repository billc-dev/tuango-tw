import axios from "axios";

import { ExtraOrdersQuery, IOrder } from "../types";

export const getUserOrders = async (username: string) => {
  const res = await axios.get<{ orders: IOrder[] }>(
    `/orders/delivered/user/${username}`
  );
  return res.data.orders.map((order) => ({
    ...order,
    order: order.order.map((item) => ({ ...item, status: "completed" })),
  })) as IOrder[];
};

export const fetchExtraOrders = async (query: ExtraOrdersQuery) => {
  const res = await axios.post<{ orders: IOrder[] }>("/orders", {
    userId: "extra",
    status: "delivered",
    sortBy: "-postNum",
    ...query,
  });
  return res.data.orders;
};
