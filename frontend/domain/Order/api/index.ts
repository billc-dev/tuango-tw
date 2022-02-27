import axios from "axios";

import { IPost } from "domain/Post/types";

import { IOrder, IOrderForm, OrderStatus } from "../types";
import { IComplete } from "../types/complete";

export const fetchOrders = async (
  postId: string
): Promise<{ orders: IOrder[] }> => {
  const res = await axios.get(`/orders/post/${postId}`);

  return { orders: res.data.orders };
};

interface CreateOrderProps {
  orderForm: IOrderForm;
}

export const createOrder = ({ orderForm }: CreateOrderProps) => {
  return axios.put<{ order?: IOrder; error?: string; post?: IPost }>(
    "/orders/order",
    { orderForm }
  );
};

export const deleteOrder = (orderId: string) => {
  return axios.delete<{ post: IPost }>("/orders/order", { data: { orderId } });
};

export const paginateNormalOrders = (
  cursor: string,
  limit: number,
  status: OrderStatus
) => {
  return axios.get<{ orders: IOrder[]; nextId: string | undefined }>(
    `/orders/user-orders/normal/paginate/${cursor}`,
    { params: { limit, status } }
  );
};

export const paginateCompletedOrders = (cursor: string, limit: number) => {
  return axios.get<{ completes: IComplete[]; nextId: string | undefined }>(
    `/orders/user-orders/completed/paginate/${cursor}`,
    { params: { limit } }
  );
};
