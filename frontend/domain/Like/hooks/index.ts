import { useMutation, useQuery, useQueryClient } from "react-query";

import { createLike, deleteLike, fetchLikes } from "domain/Like/api";
import { useIsAuthenticated } from "domain/User/hooks";

import { LikesQueryData } from "../types";

export function useLiked(postId: string) {
  const { data, isLoading } = useLikes();
  return {
    liked: data?.data.likes.some((like) => like.postId === postId),
    isLoading,
  };
}

export function useLikes() {
  const isAuthenticated = useIsAuthenticated();
  return useQuery("likes", fetchLikes, {
    enabled: isAuthenticated,
    refetchOnMount: true,
  });
}

export function useLikePost() {
  const queryClient = useQueryClient();
  return useMutation(createLike, {
    onSuccess: ({ data: { like, post } }) => {
      const data = queryClient.getQueryData<LikesQueryData>("likes");
      if (data?.data.likes) {
        queryClient.setQueryData<LikesQueryData>("likes", {
          ...data,
          data: { likes: [...data.data.likes, like] },
        });
      }
      if (post) queryClient.setQueryData(["post", post._id], { post });
    },
  });
}

export function useUnlikePost() {
  const queryClient = useQueryClient();
  return useMutation(deleteLike, {
    onSuccess: ({ data: { post } }, postId) => {
      const data = queryClient.getQueryData<LikesQueryData>("likes");
      if (data?.data.likes) {
        queryClient.setQueryData<LikesQueryData>("likes", {
          ...data,
          data: {
            likes: data?.data.likes.filter((like) => like.postId !== postId),
          },
        });
      }

      if (post) queryClient.setQueryData(["post", post._id], { post });
    },
  });
}
