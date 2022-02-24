import toast from "react-hot-toast";
import { useInfiniteQuery } from "react-query";

import { fetchPostCards } from "../api/post";
import { PostQuery } from "../types";

export * from "./usePost";

export const useInfinitePostQuery = (limit: number, query?: PostQuery) => {
  const enabled = () => {
    if (query === undefined) return true;
    if (query && query.type && query.value) return true;
    return false;
  };
  return useInfiniteQuery(
    ["posts", limit, query?.type, query?.value],
    ({ pageParam = "initial" }) => fetchPostCards(pageParam, limit, query),
    {
      enabled: enabled(),
      getNextPageParam: (lastPage) => lastPage.nextId,
      onSuccess: () => {
        if (query) toast.dismiss("search");
      },
    }
  );
};
