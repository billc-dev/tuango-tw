import { useInfiniteQuery } from "react-query";

import { fetchPostCards } from "../api/post";
import { PostQuery } from "../types";

export * from "./usePost";

export const useInfinitePostQuery = (limit: number, query?: PostQuery) => {
  const enabled = () => {
    if (!query?.type) return true;
    if (query.type && query.value) return true;
    return false;
  };
  return useInfiniteQuery(
    ["posts", limit, query],
    ({ pageParam = "initial" }) => fetchPostCards(pageParam, limit, query),
    { getNextPageParam: (lastPage) => lastPage.nextId, enabled: enabled() }
  );
};
