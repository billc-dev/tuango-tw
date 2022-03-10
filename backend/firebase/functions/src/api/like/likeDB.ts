import * as functions from "firebase-functions";
import * as mongoose from "mongoose";

import { ILike } from "./like";

const likesConn = mongoose.createConnection(
  functions.config().mongodb_uri.like_dev
);

const LikeSchema = new mongoose.Schema<ILike>({
  userId: { type: String, required: true },
  postId: { type: String, required: true },
  createdAt: {
    type: String,
    required: true,
    default: () => new Date().toISOString(),
  },
});

export const Like = likesConn.model<ILike>("Like", LikeSchema);
