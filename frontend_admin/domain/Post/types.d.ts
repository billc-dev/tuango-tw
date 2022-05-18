import { QueryTypes } from "domain/Search/types";

type PostStatus = "open" | "closed" | "completed" | "canceled";

export type PostStorageType = "roomTemp" | "refrigerated" | "frozen";
export interface Item {
  _id: string;
  id: string;
  item: string;
  price: number;
  itemQty: number;
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
  delivered: boolean;
  likeCount: number;
  commentCount: number;
  orderCount: number;
  storageType: PostStorageType;
  status: PostStatus;
  normalTotal: number;
  extraTotal: number;
  normalFee: number;
  extraFee: number;
}

export interface ILocationPostItem {
  id: string;
  item: string;
  location: string;
  checked: boolean;
}

export interface ILocationOrderItem {
  checked: boolean;
  displayName: string;
  id: string;
  item: string;
  location: string;
  orderNum: number;
  qty: number;
  _id: string;
}

export interface ILocationPost {
  postNum: number;
  title: string;
  displayName: string;
  items: ILocationPostItem[];
  orderItems: ILocationOrderItem[];
}

export interface IPostCard {
  _id: string;
  postNum: number;
  title: string;
  displayName: string;
  imageUrls?: ImageUrl[];
  items: Item[];
  orderCount?: number;
  createdAt: string;
}

export interface ImageUrl {
  sm: string;
  md: string;
  lg: string;
}

export type Action = undefined | "comment" | "order";

export interface PostQuery {
  postNum?: number;
  title?: string;
  userId?: string;
  storageType?: PostStorageType;
  deadline?: string;
  deliveryDate?: string;
  status?: PostStatus;
  page: number;
}

export interface SellerQuery {
  status?: PostStatus;
  postNum?: number;
  title?: string;
}

export interface InfinitePostsQueryData {
  pages: { posts: IPost[]; nextId: number }[];
  pageParams: [undefined | string];
}
