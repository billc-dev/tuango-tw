import axios from "axios";

import { IPost } from "domain/Post/types";

import { ILike } from "../types";

export function fetchLikes() {
  return axios.get<{ likes: ILike[] }>("/likes");
}

export function createLike(postId: string) {
  return axios.post<{ like: ILike; post: IPost }>(`/likes/post/${postId}`);
}
export function deleteLike(postId: string) {
  return axios.delete<{ post: IPost }>(`/likes/post/${postId}`);
}
