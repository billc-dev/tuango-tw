import axios from "axios";

import { PostFormSchema } from "../schema";
import { IPost, IPostCard, PostQuery, SellerQuery } from "../types";

interface PostsResponse {
  posts: IPost[];
  nextId: string | undefined;
  hasMore: boolean;
}

export const fetchSellerPosts = async (
  cursor: string,
  limit: number,
  query?: SellerQuery
) => {
  const res = await axios.get<PostsResponse>(
    `/posts/seller/paginate/${cursor}`,
    { params: { limit, query } }
  );

  return {
    posts: res.data.posts,
    nextId: res.data.hasMore ? res.data.nextId : undefined,
  };
};

export const fetchPosts = async (
  cursor: string,
  limit: number,
  fb?: boolean,
  query?: PostQuery
) => {
  const res = await axios.get<PostsResponse>(`/posts/paginate/${cursor}`, {
    params: { limit, query, fb },
  });

  return {
    posts: res.data.posts,
    nextId: res.data.hasMore ? res.data.nextId : undefined,
  };
};

interface PostCardsResponse {
  posts: IPostCard[];
  nextId: string | undefined;
  hasMore: boolean;
}

export const fetchPostCards = async (
  cursor: string,
  limit: number,
  fb?: boolean,
  query?: PostQuery
) => {
  const res = await axios.get<PostCardsResponse>(`/posts/paginate/${cursor}`, {
    headers: { type: "postCards" },
    params: { limit, query, fb },
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

export const fetchLikedPostCards = async (cursor: string, limit: number) => {
  const res = await axios.get<PostCardsResponse>(
    `/posts/liked/paginate/${cursor}`,
    {
      headers: { type: "postCards" },
      params: { limit },
    }
  );

  return {
    posts: res.data.posts,
    nextId: res.data.hasMore ? res.data.nextId : undefined,
  };
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

export const closePost = (postId: string) => {
  return axios.patch<{ post: IPost }>(`/posts/post/${postId}/close`);
};

export const deletePost = (postId: string) => {
  return axios.delete<{}>(`/posts/post/${postId}`);
};

interface NotifyGroupsParams {
  postId: string;
  message: string;
}

export const notifyGroups = ({ postId, message }: NotifyGroupsParams) => {
  return axios.post("/notify/groups", { postId, message });
};

interface SendMessageParams {
  message: string;
  userIds: string[];
  postId: string;
}

export const sendMessage = (params: SendMessageParams) => {
  return axios.post("/notify/sendMessage", params);
};

export const fetchIfCreatedPostToday = async () => {
  const res = await axios.get<{ created: boolean }>("/posts/check");
  return res.data.created;
};
