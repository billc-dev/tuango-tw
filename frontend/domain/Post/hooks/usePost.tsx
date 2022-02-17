import { useQuery } from "react-query";
import { fetchPost } from "../api/post";

export const usePost = (id: string) => {
  return useQuery(["post", id], () => fetchPost(id));
};
