import * as functions from "firebase-functions";
import * as mongoose from "mongoose";

import { DB_OPTIONS, IS_DEV } from "utils/constant";

import { IUser } from "./user";

export const usersConn = mongoose.createConnection(
  IS_DEV
    ? functions.config().mongodb_uri.user_dev
    : functions.config().mongodb_uri.user_prod,
  DB_OPTIONS
);

export const UserSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true },
  displayName: { type: String, required: true },
  pictureUrl: String,
  createdAt: {
    type: String,
    required: true,
    default: () => new Date().toISOString(),
  },
  pickupNum: { type: Number, required: true },
  role: {
    type: String,
    default: "basic",
    enum: ["basic", "seller", "admin"],
  },
  status: {
    type: String,
    default: "registered",
    enum: ["registered", "approved", "blocked"],
  },
  deliveredOrders: { type: Number, required: true, default: 0 },
  notified: { type: Boolean, required: true, default: false },
  linepay: { type: Boolean, required: true, default: false },
  comment: { type: String, default: "" },
  message: {
    notified: { type: Boolean, default: false },
    notifiedAt: { type: String, default: () => new Date().toISOString() },
  },
  fb: { type: Boolean, default: false },
});

export const User = usersConn.model<IUser>("User", UserSchema);
