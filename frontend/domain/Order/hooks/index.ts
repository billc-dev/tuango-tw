import toast from "react-hot-toast";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { Updater } from "use-immer";

import { updateInfinitePostsQueryData } from "domain/Post/services";
import { useIsAuthenticated } from "domain/User/hooks";

import {
  createOrder,
  deleteOrder,
  fetchOrders,
  paginateCompletedOrders,
  paginateExtraOrders,
  paginateNormalOrders,
} from "../api";
import { getInitialOrderForm } from "../services";
import { IOrder, IOrderForm, OrderStatus } from "../types";

interface OrderQueryData {
  orders: IOrder[];
}

export const useCreateOrder = (setOrderForm: Updater<IOrderForm>) => {
  const queryClient = useQueryClient();
  return useMutation(createOrder, {
    onSuccess: (
      { data: { post, order, error } },
      { orderForm: { postId } }
    ) => {
      const data = queryClient.getQueryData<OrderQueryData>(["order", postId]);
      if (data?.orders && order) {
        queryClient.setQueryData<OrderQueryData>(["order", postId], {
          orders: [...data.orders, order],
        });
      }

      if (error) {
        toast.error(error, { id: "orderToast" });
        return;
      }

      toast.success("您的訂單已成立！", { id: "orderToast" });

      if (!post) return;
      queryClient.setQueryData(["post", postId], { post });
      updateInfinitePostsQueryData(queryClient, post);

      setOrderForm((draft) => {
        const { postId, items, comment } = getInitialOrderForm(post);
        draft.postId = postId;
        draft.items = items;
        draft.comment = comment;
      });
    },
    onError: () => {
      toast.error("訂單製作失敗！", { id: "orderToast" });
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteOrder, {
    onSuccess: ({ data: { post } }, orderId) => {
      const { _id: postId } = post;
      const data = queryClient.getQueryData<{ orders: IOrder[] }>([
        "order",
        postId,
      ]);
      const filteredOrders = data?.orders.filter(
        (order) => order._id !== orderId
      );
      queryClient.setQueryData(["order", postId], { orders: filteredOrders });

      if (!post) return;
      queryClient.setQueryData(["post", postId], { post });
      updateInfinitePostsQueryData(queryClient, post);
    },
  });
};

export const useOrders = (postId: string, query?: { status: OrderStatus }) => {
  const queryKey = query?.status
    ? ["order", postId, query.status]
    : ["order", postId];
  return useQuery(queryKey, () => fetchOrders(postId, query), {
    refetchOnMount: "always",
  });
};

export const useNormalUserOrders = (limit: number, status: OrderStatus) => {
  const isAuthenticated = useIsAuthenticated();
  return useInfiniteQuery(
    ["orders", limit, status],
    ({ pageParam = "initial" }) =>
      paginateNormalOrders(pageParam, limit, status),
    {
      enabled: isAuthenticated,
      getNextPageParam: (lastPage) => lastPage.data.nextId,
      refetchOnMount: "always",
    }
  );
};

export const useCompletedUserOrders = (limit: number, status: OrderStatus) => {
  const isAuthenticated = useIsAuthenticated();
  return useInfiniteQuery(
    ["orders", limit, status],
    ({ pageParam = "initial" }) => paginateCompletedOrders(pageParam, limit),
    {
      enabled: isAuthenticated,
      getNextPageParam: (lastPage) => lastPage.data.nextId,
      refetchOnMount: "always",
    }
  );
};

export const useExtraOrders = (limit: number) => {
  return useInfiniteQuery(
    ["extraOrders", limit],
    ({ pageParam = "initial" }) => paginateExtraOrders(pageParam, limit),
    { getNextPageParam: (lastPage) => lastPage.data.nextId }
  );
};
