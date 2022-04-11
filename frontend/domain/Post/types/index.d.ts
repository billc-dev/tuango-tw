import { QueryTypes } from "domain/Search/types";

type PostStatus = "open" | "closed" | "completed" | "canceled";
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
  type: QueryTypes | "userId";
  value: string | number;
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
