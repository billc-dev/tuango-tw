import { useMutation, useQuery, useQueryClient } from "react-query";

import { getUserOrders } from "../api";

export const useGetUserOrders = () => {
  return useMutation(getUserOrders);
};

export const usePickupOrders = (username: string) => {
  const queryClient = useQueryClient();
  return useQuery(["pickupOrders", username], () => getUserOrders(username), {
    enabled: !!username,
    staleTime: Infinity,
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["pickupOrders", username],
        data.map((order) => ({
          ...order,
          order: order.order.map((item) => ({ ...item, status: "completed" })),
        }))
      );
    },
  });
};
