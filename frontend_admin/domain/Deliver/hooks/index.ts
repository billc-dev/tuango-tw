import { useMutation, useQuery, useQueryClient } from "react-query";

import { fetchPostDelivers, patchDeliverAmount } from "../api";

export const usePostDelivers = (postId: string) => {
  return useQuery("postDelivers", () => fetchPostDelivers(postId));
};

export const useEditDeliverAmount = () => {
  const queryClient = useQueryClient();
  return useMutation(patchDeliverAmount, {
    onSuccess() {
      queryClient.invalidateQueries("postDelivers");
      queryClient.invalidateQueries("posts");
    },
  });
};
