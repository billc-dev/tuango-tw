import { useMutation, useQueryClient } from "react-query";
import { createOrder } from "../api/order";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation(createOrder, {
    onSuccess: (data, { orderForm: { postId } }) => {
      queryClient.invalidateQueries(["order", postId]);
      queryClient.invalidateQueries(["post", postId]);
      console.log("createOrder success", data.data.order);
      console.log("createOrder failed", data.data.error);
    },
  });
};
