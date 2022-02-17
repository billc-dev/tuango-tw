import { Document } from "mongoose";
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
  status: "ordered" | "delivered" | "completed" | "missing" | "canceled";
}

interface OrderHistory {
  status: "ordered" | "delivered" | "completed" | "missing" | "canceled";
  createdAt: string;
}

export type MongooseOrder = Document<unknown, any, IOrder> &
  IOrder & {
    _id: string;
  };
