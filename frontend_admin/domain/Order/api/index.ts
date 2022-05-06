import axios from "axios";

import { IOrder } from "../types";

export const getUserOrders = async (username: string) => {
  const res = await axios.get<{ orders: IOrder[] }>(
    `/orders/delivered/user/${username}`
  );
  return res.data.orders;
};
