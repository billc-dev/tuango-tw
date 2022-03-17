import { useInfiniteQuery, useQuery } from "react-query";

import { useUser } from "domain/User/hooks";

import {
  fetchLikedPostCards,
  fetchPost,
  fetchPostCards,
  fetchSellerPosts,
} from "../api";
import { PostQuery, SellerQuery } from "../types";

export * from "./mutation";

export const useInfinitePostCardQuery = (limit: number, query?: PostQuery) => {
  const enabled = () => {
    if (query === undefined) return true;
    if (query && query.type && query.value) return true;
    return false;
  };
  return useInfiniteQuery(
    ["posts", limit, query?.type, query?.value],
    ({ pageParam = "initial" }) => fetchPostCards(pageParam, limit, query),
    { enabled: enabled(), getNextPageParam: (lastPage) => lastPage.nextId }
  );
};

export const useInfiniteSellerPosts = (
  limit: number,
  enabled: boolean,
  query?: SellerQuery
) => {
  const user = useUser();
  const isEnabled = () => {
    if (!enabled) return false;
    if (!user.data?.data.user._id) return false;
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
  const { data } = useUser();
  return useInfiniteQuery(
    ["posts", "liked", limit],
    ({ pageParam = "initial" }) => fetchLikedPostCards(pageParam, limit),
    {
      getNextPageParam: (lastPage) => lastPage.nextId,
      enabled: !!data?.data.user,
      refetchOnMount: "always",
    }
  );
};

export const usePost = (id: string) => {
  return useQuery(["post", id], () => fetchPost(id), { enabled: !!id });
};
