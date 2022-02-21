import { useQuery } from "react-query";

import { fetchOrders } from "../api/order";

export const useOrder = (postId: string) => {
  return useQuery(["order", postId], () => fetchOrders(postId), {
    refetchOnMount: "always",
  });
};
