import produce from "immer";
import { useMutation, useQueryClient } from "react-query";
import { Updater } from "use-immer";
import { createReply } from "../api";
import { CommentQueryData, IReplyForm } from "../types";

export const useCreateReply = (setReplyForm: Updater<IReplyForm>) => {
  const queryClient = useQueryClient();
  return useMutation(createReply, {
    onSuccess: ({ data }) => {
      setReplyForm((draft) => {
        draft.reply = "";
      });

      const commentsQuery = queryClient.getQueryData<CommentQueryData>([
        "comments",
        data.comment.postId,
      ]);

      const updatedCommentQuery = produce(commentsQuery, (draft) => {
        const index = draft?.data.comments.findIndex(
          (comment) => comment._id === data.comment._id
        );
        if (index === undefined || index < 0) return;
        if (!draft?.data) return;
        draft.data.comments[index] = data.comment;
      });

      if (!updatedCommentQuery) return;

      queryClient.setQueryData<CommentQueryData>(
        ["comments", data.comment.postId],
        updatedCommentQuery
      );
    },
  });
};
