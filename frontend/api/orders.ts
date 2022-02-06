import axios from "axios";
import { IOrder } from "types/order";

export const fetchOrders = async (
  postId: string
): Promise<{ orders: IOrder[] }> => {
  const res = await axios.get(`/orders/post/${postId}`);

  return { orders: res.data.orders };
};
