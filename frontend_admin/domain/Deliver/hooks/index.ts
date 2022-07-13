import { AxiosError } from "axios";
import toast from "react-hot-toast";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

import {
  deliverOrders,
  fetchDelivers,
  fetchPostDelivers,
  patchDeliverAmount,
} from "../api";
import { DeliverItemsAndSums, DeliverQuery, IDeliver } from "../types";

export const usePostDelivers = (postId: string) => {
  return useQuery("postDelivers", () => fetchPostDelivers(postId));
};

export const useEditDeliverAmount = () => {
  const queryClient = useQueryClient();
  return useMutation(patchDeliverAmount, {
    onSuccess() {
      queryClient.invalidateQueries("postDelivers");
      queryClient.invalidateQueries("posts");
      queryClient.invalidateQueries("stats");
    },
  });
};

export const useDeliverOrders = () => {
  const queryClient = useQueryClient();
  return useMutation(deliverOrders, {
    onSuccess: () => {
      queryClient.invalidateQueries("delivers");
    },
    onError: (error) => {
      if (!(error instanceof AxiosError)) return;
      if (error.response?.data.error !== "refresh postOrders") {
        toast.error("儲存失敗！請重新試一次！");
        return;
      }
      queryClient.invalidateQueries("postOrders");
      toast.error("部分訂單已到貨！已刷新進貨訂單！");
    },
  });
};

export const useInfiniteDeliverQuery = (
  limit: number,
  query?: DeliverQuery
) => {
  const queryKeys = ["delivers", limit, query];
  return useInfiniteQuery(
    queryKeys,
    ({ pageParam = "initial" }) => fetchDelivers(pageParam, limit, query),
    { getNextPageParam: (lastPage) => lastPage.nextId }
  );
};

export const useDeliverHistorySum = (deliver: IDeliver) => {
  const { normalTotal, extraTotal, normalOrders, extraOrders } = deliver;
  const totalItems = normalOrders.map((item) => {
    const index = extraOrders.findIndex(
      (extraItem) => extraItem.id === item.id
    );
    if (index === -1) return item;
    return {
      ...item,
      qty: item.qty + extraOrders[index].qty,
      amount: item.amount + extraOrders[index].amount,
    };
  });
  const sum: DeliverItemsAndSums = {
    normalItemSum: normalTotal,
    extraItemSum: extraTotal,
    totalItemSum: normalTotal + extraTotal,
    normalItems: normalOrders,
    extraItems: extraOrders,
    totalItems: totalItems,
  };
  return sum;
};
