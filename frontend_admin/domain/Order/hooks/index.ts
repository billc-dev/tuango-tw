import { useMutation, useQuery } from "react-query";

import { fetchExtraOrders, getUserOrders } from "../api";
import { ExtraOrdersQuery } from "../types";

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
