import * as functions from "firebase-functions";
import * as mongoose from "mongoose";

import { DB_OPTIONS, IS_DEV } from "utils/constant";

import { IOrder, SingleOrder } from "./order";

export const ordersConn = mongoose.createConnection(
  IS_DEV
    ? functions.config().mongodb_uri.order_dev
    : functions.config().mongodb_uri.order_prod,
  DB_OPTIONS
);

export const OrderSchema = new mongoose.Schema<IOrder>({
  orderNum: { type: Number, required: true },
  userId: { type: String, required: true },
  displayName: { type: String, required: true },
  sellerDisplayName: { type: String, required: true },
  postNum: { type: Number, required: true },
  title: { type: String, required: true },
  pictureUrl: String,
  postId: { type: String, required: true },
  imageUrl: { type: String, required: true },
  order: {
    type: [
      {
        id: { type: String, required: true },
        item: { type: String, required: true },
        qty: {
          type: Number,
          get: (v: number | string) => Number(v),
          set: (v: number | string) => Number(v),
          required: true,
        },
        price: {
          type: Number,
          get: (v: number | string) => Number(v),
          set: (v: number | string) => Number(v),
          required: true,
        },
        status: {
          type: String,
          default: "ordered",
          required: true,
        },
        location: { type: String, default: "" },
        hasName: { type: Boolean, default: false },
      },
    ],
    transform: (v: SingleOrder[]) =>
      v?.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0)),
    required: true,
  },
  comment: String,
  sellerComment: String,
  hasName: { type: Boolean, required: true, default: false },
  isExtra: { type: Boolean, required: true, default: false },
  createdAt: {
    type: String,
    required: true,
    default: () => new Date().toISOString(),
  },
  deliveredAt: String,
  canceledAt: String,
  orderHistory: {
    type: [
      {
        status: {
          type: String,
          default: "ordered",
          enum: ["ordered", "delivered", "completed", "missing", "canceled"],
        },
        createdAt: {
          type: String,
          required: true,
          default: () => new Date().toISOString(),
        },
      },
    ],
    required: true,
  },
  status: {
    type: String,
    default: "ordered",
    enum: ["ordered", "delivered", "completed", "missing", "canceled"],
  },
  fb: { type: Boolean, default: false },
});

const Order = ordersConn.model<IOrder>("Order", OrderSchema);

export default Order;
