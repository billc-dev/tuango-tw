import { Document } from "mongoose";

export interface IReply {
  reply: string;
  displayName: string;
  pictureUrl: string;
  createdAt: string;
  userId: string;
}

export interface IComment {
  userId: string;
  displayName: string;
  pictureUrl: String;
  postId: string;
  comment: string;
  replies: IReply[];
  createdAt: string;
}

export type MongooseComment = Document<unknown, any, IComment> &
  IComment & {
    _id: string;
  };
