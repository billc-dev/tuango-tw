import { Document } from "mongoose";

export type OrderStatus =
  | "ordered"
  | "delivered"
  | "completed"
  | "missing"
  | "canceled";

export interface SingleOrder {
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
  sellerComment: string;
  hasName: boolean;
  isExtra: boolean;
  createdAt: string;
  deliveredAt: string;
  canceledAt: string;
  orderHistory: OrderHistory[];
  status: OrderStatus;
}

export type MongooseOrder = Document<unknown, unknown, IOrder> &
  IOrder & {
    _id: string;
  };

export interface CreateOrderItem {
  id: string;
  item: string;
  qty: number;
  price: number;
  location: string;
}

export interface OrderQuery {
  userId?: string;
  postNum?: number;
  status?: OrderStatus;
  text?: string;
}

export interface ParsedOrderQuery {
  userId?: string;
  postNum?: number;
  status?: OrderStatus;
  $or?: { [title | sellerDisplayName | "order.item"]: RegExp }[];
}
