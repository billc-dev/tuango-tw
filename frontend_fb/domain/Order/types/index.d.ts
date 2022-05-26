import * as yup from "yup";

import { orderFormSchema, orderItemSchema } from "../schema";

export type OrderStatus =
  | "ordered"
  | "delivered"
  | "completed"
  | "missing"
  | "canceled";

interface SingleOrder {
  id: string;
  item: string;
  qty: number;
  price: number;
  status: string;
  location: string;
  hasName: boolean;
}
interface OrderHistory {
  status: OrderStatus;
  createdAt: string;
}
export interface IOrder {
  _id: string;
  orderNum: number;
  userId: string;
  displayName: string;
  sellerDisplayName: string;
  postNum: number;
  title: string;
  pictureUrl: string;
  postId: string;
  imageUrl: string;
  order: SingleOrder[];
  comment: string;
  sellerComment?: string;
  hasName: boolean;
  isExtra: boolean;
  createdAt: string;
  deliveredAt?: string;
  canceledAt?: string;
  orderHistory: OrderHistory[];
  status: OrderStatus;
}

export interface IOrderItem extends yup.InferType<typeof orderItemSchema> {}
export interface IOrderForm extends yup.InferType<typeof orderFormSchema> {}

export interface SumOrder {
  id: string;
  item: string;
  qty: number;
  amount: number;
}
