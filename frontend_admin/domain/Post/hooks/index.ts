import { useMutation, useQuery } from "react-query";

import {
  checkDuplicatePostNum,
  fetchDatePosts,
  fetchPost,
  fetchPostByPostNum,
  fetchPostItems,
  fetchPosts,
} from "../api";
import { PostQuery } from "../types";

export * from "./mutation";

export const usePost = (postId: string) => {
  return useQuery(["post", postId], () => fetchPost(postId), { cacheTime: 0 });
};

export const usePosts = (limit: number, query: PostQuery) => {
  return useQuery(["posts", limit, query], () => fetchPosts(limit, query), {
    keepPreviousData: true,
    cacheTime: 0,
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

export const usePostByPostNum = (postNum: string) => {
  return useQuery(["post", postNum], () => fetchPostByPostNum(postNum), {
    enabled: !!postNum,
  });
};

export const useDatePosts = (date: string) => {
  return useQuery(["post", date], () => fetchDatePosts(date), {
    enabled: !!date,
  });
};
