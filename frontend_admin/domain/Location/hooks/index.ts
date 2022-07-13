import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { fetchLocationOrders, updateOrdersLocation } from "../api";
import { LocationQuery } from "../types";

export const useLocationOrders = (query: LocationQuery) => {
  const isEnabled = () => {
    const { location, postNum, text } = query;
    if (typeof location === "string" || postNum || text) return true;
    return false;
  };
  return useQuery(["locationOrders", query], () => fetchLocationOrders(query), {
    staleTime: Infinity,
    cacheTime: 0,
    enabled: isEnabled(),
  });
};

export const useUpdateLocationOrders = () => {
  const queryClient = useQueryClient();
  return useMutation(updateOrdersLocation, {
    onSuccess: () => {
      queryClient.invalidateQueries("locationOrders");
    },
    onError: () => {
      toast.error("更改失敗");
      queryClient.invalidateQueries("locationOrders");
    },
  });
};
