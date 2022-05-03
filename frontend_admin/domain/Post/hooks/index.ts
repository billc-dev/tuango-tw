import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { editPost, editPostStatus, fetchPost, fetchPosts } from "../api";
import { PostQuery } from "../types";

export const usePost = (postId: string) => {
  return useQuery(["post", postId], () => fetchPost(postId), {
    enabled: !!postId,
    refetchOnMount: "always",
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
    onMutate() {
      toast.loading("貼文編輯中...", { id: "editPost" });
    },
    onSuccess() {
      queryClient.invalidateQueries("posts");
      toast.success("已成功編輯貼文!", { id: "editPost" });
    },
    onError() {
      toast.error("編輯貼文失敗!", { id: "editPost" });
    },
  });
};

export const useEditPostStatus = () => {
  const queryClient = useQueryClient();
  return useMutation(editPostStatus, {
    onSuccess() {
      queryClient.invalidateQueries("posts");
    },
    onError() {
      toast.error("編輯貼文狀態失敗!", { id: "editPost" });
    },
  });
};
