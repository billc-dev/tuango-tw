import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

import { closePost, createPost, deletePost, editPost } from "../api";
import { IPost } from "../types";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      toast.success("已成功新增貼文!", { id: "createPost" });
    },
    onError: () => {
      toast.error("新增貼文失敗!", { id: "createPost" });
    },
  });
};

export const useEditPost = () => {
  const queryClient = useQueryClient();
  return useMutation(editPost, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("posts");
      const { post } = data.data;
      queryClient.setQueryData<{ post: IPost }>(["post", post._id], { post });
      toast.success("已成功編輯貼文!", { id: "editPost" });
    },
    onError: () => {
      toast.error("編輯貼文失敗!", { id: "editPost" });
    },
  });
};

export const useClosePost = () => {
  const queryClient = useQueryClient();
  return useMutation(closePost, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("posts");
      const { post } = data.data;
      queryClient.setQueryData<{ post: IPost }>(["post", post._id], { post });
      toast.success("已結單!", { id: "closePost" });
    },
    onError: () => {
      toast.error("結單失敗!", { id: "closePost" });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation(deletePost, {
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries("posts");
      queryClient.resetQueries(["post", postId]);
      toast.success("已成功刪除貼文!", { id: "deletePost" });
    },
    onError: () => {
      toast.error("刪除貼文失敗!", { id: "deletePost" });
    },
  });
};
