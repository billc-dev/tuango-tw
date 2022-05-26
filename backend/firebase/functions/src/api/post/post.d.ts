import { Document } from "mongoose";

import * as yup from "yup";

import { postSchema } from "./postSchema";

type PostStatus = "open" | "closed" | "completed" | "canceled";

export interface Filter {
  status: PostStatus | { $ne: PostStatus };
  postNum?: number | { $lt: string };
  userId?: string;
  title?: RegExp;
}

export interface IPost {
  _id: string;
  postNum: number;
  title: string;
  displayName: string;
  userId: string;
  pictureUrl: string;
  imageUrls: ImageUrl[];
  body: string;
  items: Item[];
  createdAt: string;
  deadline: string;
  deliveryDate: string;
  likeCount: number;
  commentCount: number;
  orderCount: number;
  storageType: "roomTemp" | "refrigerated" | "frozen";
  status: PostStatus;
}

export interface IPostComplete extends IPost {
  videoUrl?: string;
  pushedAt?: string;
  normalTotal: number;
  extraTotal: number;
  normalFee: number;
  extraFee: number;
  comment?: string;
  deliverImages?: string[];
  delivered: boolean;
  fb: boolean;
}

export interface ImageUrl {
  sm: string;
  md: string;
  lg: string;
}
export interface Item {
  _id: string;
  id: string;
  item: string;
  price: number;
  qty?: number;
  itemQty: number;
}

export type MongoosePost = Document<unknown, any, IPostComplete> &
  IPostComplete & {
    _id: string;
  };

export type QueryTypes =
  | "text"
  | "postNum"
  | "deadline"
  | "deliveryDate"
  | "userId";

export interface Query {
  type?: QueryTypes;
  value?: string | number;
}

interface ValidatedPost extends yup.InferType<typeof postSchema> {}

export interface SellerQuery {
  status?: PostStatus;
  postNum?: number;
  title?: string;
}
