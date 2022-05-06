import axios from "axios";

import { User } from "domain/User/types";

import { PostFormSchema } from "../schema";
import { IPost, Item, PostQuery, PostStatus } from "../types";

export const fetchPost = async (postId: string) => {
  const res = await axios.get<{ post: IPost }>(`/posts/${postId}`);
  return res.data.post;
};

export const fetchPosts = async (limit: number, query: PostQuery) => {
  const res = await axios.post<{
    posts: IPost[];
    hasNextPage: boolean;
    length: number;
  }>("/posts", {
    limit,
    page: query.page,
    query,
  });
  return res.data;
};

interface CreatePostParams {
  postForm: PostFormSchema;
  user: User;
  postNum: number;
}

export const createPost = (params: CreatePostParams) => {
  return axios.post<{ post: IPost }>("/posts/post", params);
};

interface EditPostParams {
  postId: string;
  postForm: PostFormSchema;
}

export const editPost = ({ postId, postForm }: EditPostParams) => {
  return axios.patch(`/posts/${postId}`, { postForm });
};

interface EditPostStatusParams {
  postId: string;
  status: PostStatus;
}

export const editPostStatus = ({ postId, status }: EditPostStatusParams) => {
  return axios.patch(`/posts/${postId}/status`, { status });
};

interface SetPostDeliveredParams {
  postId: string;
  delivered: boolean;
}

export const setPostDelivered = ({
  postId,
  delivered,
}: SetPostDeliveredParams) => {
  return axios.patch(`/posts/${postId}/delivered`, { delivered });
};

export const checkDuplicatePostNum = async (postNum: number | undefined) => {
  const res = await axios.get<{ isDuplicate: boolean }>(
    `/posts/checkDuplicatePostNum/${postNum}`
  );
  return res.data.isDuplicate;
};

export const fetchPostItems = async (postId: string) => {
  const res = await axios.get<{ items: Item[] }>(`/posts/${postId}/items`);
  return res.data.items;
};
