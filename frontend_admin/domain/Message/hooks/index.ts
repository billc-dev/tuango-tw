import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";

import { fetchInfiniteMessages, sendMessage } from "../api";

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  return useMutation(sendMessage, {
    onSuccess: () => {
      queryClient.invalidateQueries("messages");
    },
  });
};

export const useInfiniteMessageQuery = (limit: number) => {
  const queryKeys = ["completes", limit];
  return useInfiniteQuery(
    queryKeys,
    ({ pageParam = "initial" }) => fetchInfiniteMessages(pageParam, limit),
    { getNextPageParam: (lastPage) => lastPage.nextId }
  );
};
