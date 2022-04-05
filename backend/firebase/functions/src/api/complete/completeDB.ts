import * as functions from "firebase-functions";
import * as mongoose from "mongoose";

import { IComplete } from "./complete";

const completeConn = mongoose.createConnection(
  functions.config().mongodb_uri.complete_dev
);

const CompleteSchema = new mongoose.Schema<IComplete>({
  userId: { type: String, required: true },
  displayName: { type: String, required: true },
  createdAt: { type: String, required: true },
  total: { type: Number, required: true },
  orders: {
    type: [
      {
        orderId: { type: String, required: true },
        orderNum: { type: Number, required: true },
        postId: { type: String, required: true },
        postNum: { type: Number, required: true },
        title: { type: String, required: true },
        sellerDisplayName: { type: String, required: true },
        order: {
          type: [
            {
              id: { type: String, required: true },
              item: { type: String, required: true },
              price: { type: Number, required: true },
              qty: { type: Number, required: true },
              location: { type: String, required: true },
            },
          ],
          required: true,
        },
        hasName: { type: Boolean, required: true },
      },
    ],
    required: true,
  },
  admin: String,
  payment: {
    linePay: { type: Boolean, default: false },
    confirmed: { type: Boolean, default: false },
  },
});

const Complete = completeConn.model<IComplete>("Complete", CompleteSchema);

export default Complete;
