import axios from "axios";
import { Post, PostCard } from "types";

export const fetchPosts = async (
  pageParam: string,
  option?: { cookie: any }
): Promise<{
  posts: Post[];
  nextId: number;
}> => {
  const options = option?.cookie ? { headers: { Cookie: option.cookie } } : {};

  const res = await axios.get(`/posts/paginate/${pageParam}`, options);

  return {
    posts: res.data.posts,
    nextId: res.data.posts[res.data.posts.length - 1].postNum,
  };
};

export const fetchPostCards = async (
  pageParam: string,
  option?: { cookie: any }
): Promise<{
  posts: PostCard[];
  nextId: number;
}> => {
  const options = option?.cookie ? { headers: { Cookie: option.cookie } } : {};

  const res = await axios.get(`/posts/paginate/${pageParam}`, {
    headers: { type: "postCards" },
    ...options,
  });

  return {
    posts: res.data.posts,
    nextId: res.data.posts[res.data.posts.length - 1].postNum,
  };
};

export const fetchPost = async (id: string): Promise<{ post: Post }> => {
  const res = await axios.get(`/posts/post/${id}`);
  return { post: res.data.post };
};
