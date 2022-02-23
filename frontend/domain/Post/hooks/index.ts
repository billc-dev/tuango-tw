import { useInfiniteQuery } from "react-query";

import { fetchPostCards } from "../api/post";

export * from "./usePost";

export const useInfinitePostQuery = () => {
  return useInfiniteQuery(
    "posts",
    ({ pageParam = "initial" }) => fetchPostCards(pageParam),
    { getNextPageParam: (lastPage) => lastPage.nextId }
  );
};
