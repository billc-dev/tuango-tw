import { useMutation, useQueryClient } from "react-query";
import { deleteOrder } from "../api/order";
import { IOrder } from "../types";

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
