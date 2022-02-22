import * as yup from "yup";

import { commentFormSchema, replyFormScheam } from "../schema";

export interface IReply {
  reply: string;
  displayName: string;
  pictureUrl: string;
  createdAt: string;
  userId: string;
}

export interface IComment {
  _id: string;
  userId: string;
  displayName: string;
  pictureUrl: string;
  postId: string;
  comment: string;
  replies: IReply[];
  createdAt: string;
}

export interface CommentQueryData {
  data: { comments: IComment[] };
}

export interface ICommentForm extends yup.InferType<typeof commentFormSchema> {}
export interface IReplyForm extends yup.InferType<typeof replyFormScheam> {}
