import { useQuery } from "react-query";
import { fetchComments } from "../api";

export const useGetComments = (postId: string) => {
  return useQuery(["comments", postId], () => fetchComments(postId), {
    refetchOnMount: "always",
  });
};
