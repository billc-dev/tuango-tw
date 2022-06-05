import { useQuery } from "react-query";

export const useSubmitting = () => {
  return useQuery("submitting", () => false, { cacheTime: Infinity });
};
