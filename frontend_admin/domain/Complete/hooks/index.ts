import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";

import { changePaymentMethod, confirmPayment, fetchCompletes } from "../api";
import { CompleteQuery } from "../types";

export const useInfiniteCompleteQuery = (
  limit: number,
  query?: CompleteQuery
) => {
  const queryKeys = ["completes", limit, query];
  return useInfiniteQuery(
    queryKeys,
    ({ pageParam = "initial" }) => fetchCompletes(pageParam, limit, query),
    { getNextPageParam: (lastPage) => lastPage.nextId }
  );
};

export const useChangePaymentMethod = () => {
  return useMutation(changePaymentMethod);
};

export const useConfirmPayment = () => {
  const queryClient = useQueryClient();
  return useMutation(confirmPayment, {
    onSuccess: () => {
      queryClient.invalidateQueries("completes");
    },
  });
};
