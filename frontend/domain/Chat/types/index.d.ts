import { IUser } from "api/auth/userDB";
import { IOrder } from "domain/Order/types";
import { IPost, ImageUrl } from "domain/Post/types";

interface IRoomUser {
  user: string | IUser;
  notifications: number;
  notified: boolean;
  notifiedAt: string;
}

export interface IRoom {
  _id: string;
  users: IRoomUser[];
  lastCreatedAt: string;
  lastMessage: string;
  hasMessage: boolean;
}

interface Read {
  userId: string;
  read: boolean;
}

export type MessageType = "text" | "imageUrl" | "post" | "order";

export interface IMessage {
  _id: string;
  roomId: string;
  userId: string;
  read: [Read];
  unsend: boolean;
  createdAt: string;
  updatedAt: string;
  type: MessageType;
  text?: string;
  imageUrl?: ImageUrl;
  post?: string | IPost;
  order?: string | IOrder;
}
