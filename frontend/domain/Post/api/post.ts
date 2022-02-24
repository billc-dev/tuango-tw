import axios from "axios";

import { IPost, IPostCard, PostQuery } from "../types";

export const fetchPostCards = async (
  cursor: string,
  limit: number,
  query?: PostQuery
): Promise<{
  posts: IPostCard[];
  nextId: number | undefined;
}> => {
  const res = await axios.get<{ posts: IPostCard[] }>(
    `/posts/paginate/${cursor}`,
    {
      headers: { type: "postCards" },
      params: { limit, query },
    }
  );

  const getNextId = () => {
    const lastIndex = res.data.posts.length - 1;
    if (res.data.posts[lastIndex]) {
      return res.data.posts[lastIndex].postNum;
    }
    return undefined;
  };

  return {
    posts: res.data.posts,
    nextId: getNextId(),
  };
};

export const fetchPost = async (id: string): Promise<{ post: IPost }> => {
  const res = await axios.get(`/posts/post/${id}`);
  return { post: res.data.post };
};
