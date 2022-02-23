import axios from "axios";

import { IPost, IPostCard, PostQuery } from "../types";

export const fetchPostCards = async (
  cursor: string,
  limit: number,
  query?: PostQuery
): Promise<{
  posts: IPostCard[];
  nextId: number;
  hasMore: boolean;
}> => {
  const res = await axios.get(`/posts/paginate/${cursor}`, {
    headers: { type: "postCards" },
    params: { limit, query },
  });

  return {
    posts: res.data.posts,
    nextId: res.data.posts[res.data.posts.length - 1].postNum,
    hasMore: res.data.hasMore,
  };
};

export const fetchPost = async (id: string): Promise<{ post: IPost }> => {
  const res = await axios.get(`/posts/post/${id}`);
  return { post: res.data.post };
};
