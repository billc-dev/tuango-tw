import toast from "react-hot-toast";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { Updater } from "use-immer";

import * as gtag from "domain/GoogleAnalytics/gtag";
import { updateInfinitePostsQueryData } from "domain/Post/services";
import { useIsAuthenticated } from "domain/User/hooks";

import {
  createOrder,
  deleteOrder,
  fetchOrders,
  getComplete,
  paginateCompletedOrders,
  paginateExtraOrders,
  paginateNormalOrders,
  setHasName,
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

      if (!order) return;
      gtag.purchaseEvent(order);
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
      let deletedOrder: IOrder | undefined = undefined;
      const filteredOrders = data?.orders.filter((order) => {
        if (order._id === orderId) deletedOrder = order;
        return order._id !== orderId;
      });
      queryClient.setQueryData(["order", postId], { orders: filteredOrders });

      if (!post) return;
      queryClient.setQueryData(["post", postId], { post });
      updateInfinitePostsQueryData(queryClient, post);

      if (!deletedOrder) return;
      gtag.refundEvent(deletedOrder);
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

export const useSetHasName = (postId: string) => {
  const queryClient = useQueryClient();
  return useMutation(setHasName, {
    onSuccess: ({ data: { order } }) => {
      const orders = queryClient.getQueryData<OrderQueryData>([
        "order",
        postId,
      ]);
      if (!orders) return;
      const updatedOrders = {
        ...orders,
        orders: orders.orders.map((ord) => {
          if (ord._id === order._id) return order;
          return ord;
        }),
      };
      queryClient.setQueryData(["order", postId], updatedOrders);
    },
  });
};

export const useComplete = (id: string) => {
  const isAuthenticated = useIsAuthenticated();
  return useQuery(["complete", id], () => getComplete(id), {
    enabled: isAuthenticated,
  });
};
