import { QueryTypes } from "domain/Search/types";

type PostStatus = "open" | "closed" | "completed" | "canceled";

export type PostStorageType = "roomTemp" | "refrigerated" | "frozen";

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
export interface Item {
  _id: string;
  id: string;
  item: string;
  price: number;
  itemQty: number;
}

export type Action = undefined | "comment" | "order";

export interface PostQuery {
  postNum?: number;
  title?: string;
  displayName?: string;
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
