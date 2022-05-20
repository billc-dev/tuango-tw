import axios from "axios";

import { PostOrdersParams } from "../hooks";
import {
  CreateOrderItem,
  ExtraOrdersQuery,
  IOrder,
  OrderQuery,
} from "../types";

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

interface CreateDeliveredOrderParams {
  postId: string;
  orderItems: CreateOrderItem[];
  username: string;
  comment: string;
}

export const createDeliveredOrder = async (
  params: CreateDeliveredOrderParams
) => {
  const res = await axios.post<{ order: IOrder }>(
    "/orders/order/delivered",
    params
  );
  return {
    ...res.data.order,
    order: res.data.order.order.map((item) => ({
      ...item,
      status: "completed",
    })),
  } as IOrder;
};

interface CreateExtraDeliveredOrderParams {
  orderId: string;
  orderItems: CreateOrderItem[];
  username: string;
  comment: string;
}

export const createExtraDeliveredOrder = async (
  params: CreateExtraDeliveredOrderParams
) => {
  const res = await axios.post<{ order: IOrder }>(
    "/orders/order/delivered/extra",
    params
  );
  return {
    ...res.data.order,
    order: res.data.order.order.map((item) => ({
      ...item,
      status: "completed",
    })),
  } as IOrder;
};

interface CompleteOrdersParams {
  orders: IOrder[];
  linePay: boolean;
  sum: number;
}

export const completeOrders = async (params: CompleteOrdersParams) => {
  await axios.patch<{}>("/orders/complete", params);
};

export const fetchOrders = async (limit: number, query: OrderQuery) => {
  const res = await axios.post<{
    orders: IOrder[];
    hasNextPage: boolean;
    length: number;
  }>("/orders/paginate", {
    limit,
    page: query.page,
    query,
  });
  return res.data;
};

export const fetchOrder = async (orderId: string) => {
  const res = await axios.get<{ order: IOrder }>(`/orders/${orderId}`);
  return res.data.order;
};

export const updateOrder = async (order: IOrder) => {
  return axios.patch(`/orders/${order._id}`, { order });
};

export const getPostOrders = async ({
  postId,
  ...params
}: PostOrdersParams) => {
  const res = await axios.post<{ orders: IOrder[] }>(
    `/orders/post/${postId}`,
    params
  );
  return res.data.orders.map((order) => ({ ...order, checked: false }));
};
