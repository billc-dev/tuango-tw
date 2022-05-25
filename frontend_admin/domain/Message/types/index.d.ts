import { OrderStatus } from "domain/Order/types";
import { PostStorageType } from "domain/Post/types";

export interface MessageOrderQuery {
  userId?: string;
  postNum?: number;
  status?: OrderStatus | "";
  text?: string;
  storageType?: string;
  deliveredAt?: string;
  FB?: boolean;
  sortBy?: string;
}

export interface IMessage {
  message: string;
  query: {
    postNum: number;
    status: string;
    storageType: string;
    title: string;
    displayName: string;
  };
  sentTo: string[];
  createdAt: string;
}
