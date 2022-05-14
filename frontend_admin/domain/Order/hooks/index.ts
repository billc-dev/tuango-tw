import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  completeOrders,
  createDeliveredOrder,
  createExtraDeliveredOrder,
  fetchExtraOrders,
  getUserOrders,
} from "../api";
import { ExtraOrdersQuery, IOrder } from "../types";

export const useGetUserOrders = () => {
  return useMutation(getUserOrders);
};

export const usePickupOrders = (username: string) => {
  return useQuery(["pickupOrders", username], () => getUserOrders(username), {
    enabled: !!username,
    staleTime: Infinity,
  });
};

export const useExtraOrders = (query: ExtraOrdersQuery) => {
  return useQuery(["extraOrders", query], () => fetchExtraOrders(query));
};

export const useCreateDeliveredExtraOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(createExtraDeliveredOrder, {
    onSuccess: (order, variables) => {
      queryClient.invalidateQueries("extraOrders");
      const orders = queryClient.getQueryData<IOrder[]>([
        "pickupOrders",
        variables.username,
      ]);
      if (!orders) return;
      queryClient.setQueryData<IOrder[]>(
        ["pickupOrders", variables.username],
        [order, ...orders]
      );
    },
  });
};

export const useCreateDeliveredOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(createDeliveredOrder, {
    onSuccess: (order, variables) => {
      queryClient.invalidateQueries("extraOrders");
      const orders = queryClient.getQueryData<IOrder[]>([
        "pickupOrders",
        variables.username,
      ]);
      if (!orders) return;
      queryClient.setQueryData<IOrder[]>(
        ["pickupOrders", variables.username],
        [order, ...orders]
      );
    },
  });
};

export const useCompleteOrders = (
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();
  return useMutation(completeOrders, {
    onSuccess: () => {
      queryClient.invalidateQueries("complete");
    },
    onError: (error) => {
      if (!(error instanceof AxiosError)) return;
      if (error.response?.data.error !== "refresh pickupOrders") {
        toast.error("合計失敗！請重新試一次！");
        return;
      }
      queryClient.invalidateQueries("pickupOrders");
      toast.error("部分訂單已完成！已刷新已到貨訂單！");
      setOpen(false);
    },
  });
};
