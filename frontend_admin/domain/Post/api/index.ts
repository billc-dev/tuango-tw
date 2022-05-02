import axios from "axios";

import { PostFormSchema } from "../schema";
import { IPost, PostQuery } from "../types";

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

export const createPost = (postForm: PostFormSchema) => {
  return axios.post<{ post: IPost }>("/posts/post", { postForm });
};

interface EditPostParams {
  postId: string;
  postForm: PostFormSchema;
}

export const editPost = ({ postId, postForm }: EditPostParams) => {
  return axios.patch<{ post: IPost }>(`/posts/post/${postId}`, { postForm });
};
