import * as mongoose from "mongoose";
import * as functions from "firebase-functions";
import { IComment } from "./comment";

const commentsConn = mongoose.createConnection(
  functions.config().mongodb_uri.comment_dev
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
        createdAt: { type: String, required: true },
        userId: { type: String, required: true },
      },
    ],
    required: true,
  },
  createdAt: { type: String, required: true },
});

export const Comment = commentsConn.model<IComment>("Comment", CommentSchema);
