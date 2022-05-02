import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { editPost, fetchPost, fetchPosts } from "../api";
import { IPost, PostQuery } from "../types";

export const usePost = (postId: string) => {
  return useQuery(["post", postId], () => fetchPost(postId), {
    enabled: !!postId,
    refetchOnMount: true,
  });
};

export const usePosts = (limit: number, query: PostQuery) => {
  return useQuery(["posts", limit, query], () => fetchPosts(limit, query), {
    keepPreviousData: true,
  });
};

export const useEditPost = () => {
  const queryClient = useQueryClient();
  return useMutation(editPost, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("posts");
      queryClient.invalidateQueries("postCards");
      const { post } = data.data;
      queryClient.setQueryData<{ post: IPost }>(["post", post._id], { post });
      toast.success("已成功編輯貼文!", { id: "editPost" });
    },
    onError: () => {
      toast.error("編輯貼文失敗!", { id: "editPost" });
    },
  });
};
