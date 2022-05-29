import * as functions from "firebase-functions";
import * as mongoose from "mongoose";

import { DB_OPTIONS, IS_DEV } from "utils/constant";

import { IPostComplete } from "./post";

export const postsConn = mongoose.createConnection(
  IS_DEV
    ? functions.config().mongodb_uri.post_dev
    : functions.config().mongodb_uri.post_prod,
  DB_OPTIONS
);

export const PostSchema = new mongoose.Schema<IPostComplete>({
  userId: { type: String, required: true },
  displayName: { type: String, required: true },
  pictureUrl: String,
  postNum: { type: Number, required: true },
  title: { type: String, required: true },
  videoUrl: String,
  imageUrls: Array,
  body: { type: String, required: true },
  items: {
    type: [
      {
        id: { type: String, required: true },
        item: { type: String, required: true },
        price: {
          type: Number,
          get: (v: number | string) => Number(v),
          set: (v: number | string) => Number(v),
          required: true,
        },
        itemQty: {
          type: Number,
          get: (v: number | string) => Number(v),
          set: (v: number | string) => Number(v),
          default: 100,
          required: true,
          min: 0,
        },
      },
    ],
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
    default: () => new Date().toISOString(),
  },
  pushedAt: { type: String },
  deadline: String,
  deliveryDate: String,
  likeCount: { type: Number, required: true, default: 0 },
  commentCount: { type: Number, required: true, default: 0 },
  orderCount: { type: Number, required: true, default: 0 },
  normalTotal: { type: Number, required: true, default: 0 },
  extraTotal: { type: Number, required: true, default: 0 },
  normalFee: { type: Number, required: true, default: 0 },
  extraFee: { type: Number, required: true, default: 0 },
  storageType: {
    type: String,
    required: true,
    enum: ["roomTemp", "farmGoods", "refrigerated", "frozen"],
  },
  status: {
    type: String,
    default: "open",
    enum: ["open", "closed", "completed", "canceled"],
  },
  comment: String,
  deliverImages: { type: Array, default: [] },
  delivered: { type: Boolean, default: false },
  fb: { type: Boolean, default: false },
});

export const Post = postsConn.model<IPostComplete>("Post", PostSchema);
