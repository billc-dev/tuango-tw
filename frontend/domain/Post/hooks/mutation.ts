import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

import { createPost, editPost } from "../api";
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
