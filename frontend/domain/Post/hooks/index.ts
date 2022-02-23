import { useInfiniteQuery } from "react-query";

import { fetchPostCards } from "../api/post";
import { PostQuery } from "../types";

export * from "./usePost";

export const useInfinitePostQuery = (limit: number, query?: PostQuery) => {
  return useInfiniteQuery(
    ["posts", limit],
    ({ pageParam = "initial" }) => fetchPostCards(pageParam, limit, query),
    { getNextPageParam: (lastPage) => lastPage.nextId }
  );
};
