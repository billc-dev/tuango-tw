import axios from "axios";

import { IPost, IPostCard, PostQuery } from "../types";

export const fetchPostCards = async (
  cursor: string,
  limit: number,
  query?: PostQuery
): Promise<{
  posts: IPostCard[];
  nextId: string | undefined;
}> => {
  const res = await axios.get<{
    posts: IPostCard[];
    nextId: string | undefined;
    hasMore: boolean;
  }>(`/posts/paginate/${cursor}`, {
    headers: { type: "postCards" },
    params: { limit, query },
  });

  return {
    posts: res.data.posts,
    nextId: res.data.hasMore ? res.data.nextId : undefined,
  };
};

export const fetchPost = async (id: string): Promise<{ post: IPost }> => {
  const res = await axios.get(`/posts/post/${id}`);
  return { post: res.data.post };
};

export const fetchLikedPostCards = async (
  cursor: string,
  limit: number
): Promise<{
  posts: IPostCard[];
  nextId: string | undefined;
}> => {
  const res = await axios.get<{
    posts: IPostCard[];
    nextId: string | undefined;
    hasMore: boolean;
  }>(`/posts/liked/paginate/${cursor}`, {
    headers: { type: "postCards" },
    params: { limit },
  });

  return {
    posts: res.data.posts,
    nextId: res.data.hasMore ? res.data.nextId : undefined,
  };
};
