import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { MessageOrderQuery } from "domain/Message/types";

import {
  completeOrders,
  createDeliveredOrder,
  createExtraDeliveredOrder,
  createOrder,
  fetchExtraOrders,
  fetchOrder,
  fetchOrders,
  getPostOrders,
  getUserOrders,
  paginateOrders,
  updateOrder,
} from "../api";
import { ExtraOrdersQuery, IOrder, OrderQuery, OrderStatus } from "../types";

export const useGetUserOrders = () => {
  return useMutation(getUserOrders);
};

export const usePickupOrders = (username: string) => {
  return useQuery(["pickupOrders", username], () => getUserOrders(username), {
    enabled: !!username,
    staleTime: Infinity,
  });
};

export const useOrders = (query: MessageOrderQuery) => {
  const enabled = () => {
    const { userId, postNum, text, status } = query;
    if (userId || postNum || text || status) return true;
    return false;
  };
  return useQuery(["orders", query], () => fetchOrders(query), {
    enabled: enabled(),
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
      queryClient.invalidateQueries("completes");
    },
    onError: (error) => {
      if (!(error instanceof AxiosError)) return;
      if (error.response?.data.error !== "refresh pickupOrders") {
        toast.error("????????????????????????????????????");
        return;
      }
      queryClient.invalidateQueries("pickupOrders");
      toast.error("???????????????????????????????????????????????????");
      setOpen(false);
    },
  });
};

export const usePaginateOrders = (limit: number, query: OrderQuery) => {
  return useQuery(
    ["orders", limit, query],
    () => paginateOrders(limit, query),
    {
      keepPreviousData: true,
      cacheTime: 0,
    }
  );
};

export const useOrder = (orderId: string) => {
  return useQuery(["order", orderId], () => fetchOrder(orderId), {
    cacheTime: 0,
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(updateOrder, {
    onMutate: () => {
      queryClient.setQueryData("submitting", true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("orders");
    },
    onError: () => {
      toast.error("????????????????????????????????????");
    },
    onSettled: () => {
      queryClient.setQueryData("submitting", false);
    },
  });
};

export interface PostOrdersParams {
  postId?: string;
  status?: OrderStatus;
}

export const usePostOrders = (params: PostOrdersParams) => {
  return useQuery(["postOrders", params], () => getPostOrders(params), {
    enabled: !!params.postId,
    staleTime: Infinity,
    refetchOnMount: false,
  });
};

export const useCreateOrder = () => {
  return useMutation(createOrder);
};
