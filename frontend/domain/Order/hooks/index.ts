import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Updater } from "use-immer";

import { createOrder, deleteOrder, fetchOrders } from "../api/order";
import { getInitialOrderForm } from "../services";
import { IOrder, IOrderForm } from "../types";

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
      if (!post) return;
      queryClient.setQueryData(["post", postId], { post });
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

      setOrderForm((draft) => {
        const { postId, items, comment } = getInitialOrderForm(post);
        draft.postId = postId;
        draft.items = items;
        draft.comment = comment;
      });
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteOrder, {
    onSuccess: ({ data: { post } }, orderId) => {
      const { _id: postId } = post;
      if (!post) return;
      queryClient.setQueryData(["post", postId], { post });
      const data = queryClient.getQueryData<{ orders: IOrder[] }>([
        "order",
        postId,
      ]);
      const filteredOrders = data?.orders.filter(
        (order) => order._id !== orderId
      );
      queryClient.setQueryData(["order", postId], { orders: filteredOrders });
    },
  });
};

export const useOrders = (postId: string) => {
  return useQuery(["order", postId], () => fetchOrders(postId), {
    refetchOnMount: "always",
  });
};
