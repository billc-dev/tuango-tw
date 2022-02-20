import { useMutation, useQueryClient } from "react-query";
import { Updater } from "use-immer";
import { createComment } from "../api";
import { CommentQueryData, ICommentForm } from "../types";

export const useCreateComment = (setCommentForm: Updater<ICommentForm>) => {
  const queryClient = useQueryClient();
  return useMutation(createComment, {
    onSuccess: ({ data: { comment, post } }) => {
      const data = queryClient.getQueryData<CommentQueryData>([
        "comments",
        post._id,
      ]);

      if (data?.data.comments) {
        queryClient.setQueryData<CommentQueryData>(["comments", post._id], {
          data: { comments: [comment, ...data.data.comments] },
        });
      }

      setCommentForm((draft) => {
        draft.comment = "";
      });
    },
  });
};
