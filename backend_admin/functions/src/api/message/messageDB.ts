import * as functions from "firebase-functions";
import * as mongoose from "mongoose";

import { DB_OPTIONS, IS_DEV } from "utils/constant";

import { IMessage } from "./message";

const messageConn = mongoose.createConnection(
  IS_DEV
    ? functions.config().mongodb_uri.message_dev
    : functions.config().mongodb_uri.message_prod,
  DB_OPTIONS
);

const MessageSchema = new mongoose.Schema<IMessage>({
  message: { type: String, required: true },
  query: {
    postNum: Number,
    status: String,
    storageType: String,
    title: String,
    displayName: String,
  },
  sentTo: { type: [], required: true },
  createdAt: {
    type: String,
    required: true,
    default: () => new Date().toISOString(),
  },
});

const Message = messageConn.model<IMessage>("Message", MessageSchema);

export default Message;
