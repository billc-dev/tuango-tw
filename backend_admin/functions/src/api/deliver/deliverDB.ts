import * as functions from "firebase-functions";
import * as mongoose from "mongoose";

import { DB_OPTIONS, IS_DEV } from "utils/constant";

import { IDeliver } from "./deliver";

const deliverConn = mongoose.createConnection(
  IS_DEV
    ? functions.config().mongodb_uri.deliver_dev
    : functions.config().mongodb_uri.deliver_prod,
  DB_OPTIONS
);

const DeliverSchema = new mongoose.Schema<IDeliver>({
  userId: { type: String, required: true },
  displayName: { type: String, required: true },
  postId: { type: String, required: true },
  postNum: { type: Number, required: true },
  title: { type: String, required: true },
  createdAt: {
    type: String,
    required: true,
    default: () => new Date().toISOString(),
  },
  normalOrders: {
    type: [
      {
        id: { type: String, required: true },
        item: { type: String, required: true },
        price: { type: Number, required: true },
        amount: { type: Number, required: true },
      },
    ],
    required: true,
  },
  extraOrders: {
    type: [
      {
        id: { type: String, required: true },
        item: { type: String, required: true },
        price: { type: Number, required: true },
        amount: { type: Number, required: true },
      },
    ],
    required: true,
  },
  normalTotal: { type: Number, required: true, default: 0 },
  extraTotal: { type: Number, required: true, default: 0 },
  normalFee: { type: Number, required: true, default: 0 },
  extraFee: { type: Number, required: true, default: 0 },
  checked: { type: Boolean, default: false },
});

const Deliver = deliverConn.model<IDeliver>("Deliver", DeliverSchema);

export default Deliver;
