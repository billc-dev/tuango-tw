import * as functions from "firebase-functions";
import * as mongoose from "mongoose";

import { IS_DEV } from "utils/constant";

import { IComment } from "./comment";

const commentsConn = mongoose.createConnection(
  IS_DEV
    ? functions.config().mongodb_uri.comment_dev
    : functions.config().mongodb_uri.comment_prod
);

const CommentSchema = new mongoose.Schema<IComment>({
  userId: { type: String, required: true },
  displayName: { type: String, required: true },
  pictureUrl: String,
  postId: { type: String, required: true },
  comment: { type: String, required: true },
  replies: {
    type: [
      {
        reply: { type: String, required: true },
        displayName: { type: String, required: true },
        pictureUrl: { type: String, required: true },
        createdAt: {
          type: String,
          required: true,
          default: () => new Date().toISOString(),
        },
        userId: { type: String, required: true },
      },
    ],
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
    default: () => new Date().toISOString(),
  },
});

export const Comment = commentsConn.model<IComment>("Comment", CommentSchema);
