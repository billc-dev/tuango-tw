import { useInfiniteQuery, useQuery } from "react-query";

import { useIsAuthenticated } from "domain/User/hooks";

import {
  fetchLikedPostCards,
  fetchPost,
  fetchPostCards,
  fetchPosts,
  fetchSellerPosts,
} from "../api";
import { PostQuery, SellerQuery } from "../types";

export * from "./mutation";

interface Options {
  query?: PostQuery;
  enabled?: boolean;
}

export const useInfinitePostsQuery = (limit: number, options?: Options) => {
  const enabled = () => {
    if (options?.enabled === false) return false;
    if (options?.query === undefined) return true;
    if (options?.query && options.query.type && options.query.value)
      return true;
    return false;
  };
  const queryKeys = [
    "posts",
    limit,
    ...(options?.query ? [options?.query.type, options?.query.value] : []),
  ];
  return useInfiniteQuery(
    queryKeys,
    ({ pageParam = "initial" }) => fetchPosts(pageParam, limit, options?.query),
    { enabled: enabled(), getNextPageParam: (lastPage) => lastPage.nextId }
  );
};

export const useInfinitePostCardQuery = (limit: number, options?: Options) => {
  const enabled = () => {
    if (options?.enabled === false) return false;
    if (options?.query === undefined) return true;
    if (options?.query && options.query.type && options.query.value)
      return true;
    return false;
  };
  const queryKeys = [
    "postCards",
    limit,
    ...(options?.query ? [options?.query.type, options?.query.value] : []),
  ];
  return useInfiniteQuery(
    queryKeys,
    ({ pageParam = "initial" }) =>
      fetchPostCards(pageParam, limit, options?.query),
    { enabled: enabled(), getNextPageParam: (lastPage) => lastPage.nextId }
  );
};

export const useInfiniteSellerPosts = (
  limit: number,
  options: {
    enabled?: boolean;
    query?: SellerQuery;
  }
) => {
  const { enabled, query } = options;
  const isAuthenticated = useIsAuthenticated();

  const isEnabled = () => {
    if (enabled !== undefined && !enabled) return false;
    if (!isAuthenticated) return false;
    if (query === undefined) return true;
    if ((query && query.status) || query.postNum || query.title) return true;
    return false;
  };

  return useInfiniteQuery(
    ["sellerPosts", limit, query?.status, query?.postNum, query?.title],
    ({ pageParam = "initial" }) => fetchSellerPosts(pageParam, limit, query),
    {
      enabled: isEnabled(),
      getNextPageParam: (lastPage) => lastPage.nextId,
    }
  );
};

export const useInfiniteLikedPostQuery = (limit: number) => {
  const isAuthenticated = useIsAuthenticated();
  return useInfiniteQuery(
    ["posts", "liked", limit],
    ({ pageParam = "initial" }) => fetchLikedPostCards(pageParam, limit),
    {
      getNextPageParam: (lastPage) => lastPage.nextId,
      enabled: isAuthenticated,
      refetchOnMount: "always",
    }
  );
};

export const usePost = (id: string) => {
  return useQuery(["post", id], () => fetchPost(id), {
    enabled: !!id,
    refetchOnMount: true,
  });
};
