import * as functions from "firebase-functions";
import * as mongoose from "mongoose";

import { IOrder } from "api/order/order";
import { OrderSchema, ordersConn } from "api/order/orderDB";
import { PostSchema, postsConn } from "api/post";
import { IPost, ImageUrl } from "api/post/post";
import { DB_OPTIONS, IS_DEV } from "utils/constant";

export const messageConn = mongoose.createConnection(
  IS_DEV
    ? functions.config().mongodb_uri.chat_dev
    : functions.config().mongodb_uri.chat_prod,
  DB_OPTIONS
);

interface Read {
  userId: string;
  read: boolean;
}

export type MessageType = "text" | "imageUrl" | "post" | "order";

export interface IMessage {
  _id: string;
  roomId: string;
  userId: string;
  read: [Read];
  unsend: boolean;
  createdAt: string;
  updatedAt: string;
  type: MessageType;
  text?: string;
  imageUrl?: ImageUrl;
  post?: string | IPost;
  order?: string | IOrder;
}

export type MongooseMessage = mongoose.Document<unknown, any, IMessage> &
  IMessage & { _id: string };

const MessageSchema = new mongoose.Schema<IMessage>({
  roomId: { type: String, required: true },
  userId: { type: String, required: true },
  read: {
    type: [
      {
        userId: { type: String, required: true },
        read: { type: Boolean, required: true },
      },
    ],
    required: true,
  },
  unsend: { type: Boolean, required: true, default: false },
  createdAt: {
    type: String,
    required: true,
    default: () => new Date().toISOString(),
  },
  updatedAt: {
    type: String,
    required: true,
    default: () => new Date().toISOString(),
  },
  type: {
    type: String,
    required: true,
    enum: ["text", "imageUrl", "post", "order", "deliver", "complete"],
  },
  text: { type: String },
  imageUrl: { type: { sm: String, md: String, lg: String } },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: postsConn.model("Post", PostSchema),
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ordersConn.model("Order", OrderSchema),
  },
});

export const Message = messageConn.model<IMessage>("Message", MessageSchema);
