import { AxiosResponse } from "axios";

export interface ILike {
  _id: string;
  userId: string;
  postId: string;
  createdAt: string;
}

export type LikesQueryData = AxiosResponse<{ likes: ILike[] }>;
