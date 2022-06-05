import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

import { createPost, editPost, editPostStatus, setPostDelivered } from "../api";

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
    onMutate: () => {
      queryClient.setQueryData("submitting", true);
      toast.loading("貼文編輯中...", { id: "editPost" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      toast.success("已成功編輯貼文!", { id: "editPost" });
    },
    onError: () => {
      toast.error("編輯貼文失敗!", { id: "editPost" });
    },
    onSettled: () => {
      queryClient.setQueryData("submitting", false);
    },
  });
};

export const useEditPostStatus = () => {
  const queryClient = useQueryClient();
  return useMutation(editPostStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
    onError: () => {
      toast.error("編輯貼文狀態失敗!", { id: "editPost" });
    },
  });
};

export const useSetPostDelivered = () => {
  const queryClient = useQueryClient();
  return useMutation(setPostDelivered, {
    onSuccess() {
      queryClient.invalidateQueries("posts");
    },
  });
};
