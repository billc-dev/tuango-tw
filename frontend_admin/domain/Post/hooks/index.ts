import { useMutation, useQuery } from "react-query";

import {
  checkDuplicatePostNum,
  fetchPost,
  fetchPostByPostNum,
  fetchPostItems,
  fetchPosts,
} from "../api";
import { PostQuery } from "../types";

export * from "./mutation";

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

export const useCheckDuplicatePostNum = (postNum: number | undefined) => {
  return useQuery(
    ["duplicatePostNum", postNum],
    () => checkDuplicatePostNum(postNum),
    { enabled: !!postNum }
  );
};

export const usePostItems = (postId: string) => {
  return useQuery(["postItems", postId], () => fetchPostItems(postId));
};

export const useGetPostByPostNum = () => {
  return useMutation(fetchPostByPostNum);
};
