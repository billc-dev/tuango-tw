import { useInfiniteQuery } from "react-query";
import { useQuery } from "react-query";

import { useUser } from "domain/User/hooks";

import { fetchLikedPostCards, fetchPostCards } from "../api";
import { fetchPost } from "../api";
import { PostQuery } from "../types";

export const useInfinitePostQuery = (limit: number, query?: PostQuery) => {
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
