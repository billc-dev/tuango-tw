import axios, { AxiosResponse } from "axios";

import { IPost } from "domain/Post/types";

import { IOrder, IOrderForm } from "../types";

export const fetchOrders = async (
  postId: string
): Promise<{ orders: IOrder[] }> => {
  const res = await axios.get(`/orders/post/${postId}`);

  return { orders: res.data.orders };
};

type CreateOrder = (variables: {
  orderForm: IOrderForm;
}) => Promise<AxiosResponse<{ order?: IOrder; error?: string; post?: IPost }>>;

export const createOrder: CreateOrder = ({ orderForm }) => {
  return axios.put("/orders/order", { orderForm });
};

type DeleteOrder = (orderId: string) => Promise<AxiosResponse<{ post: IPost }>>;

export const deleteOrder: DeleteOrder = (orderId) => {
  return axios.delete("/orders/order", { data: { orderId } });
};
