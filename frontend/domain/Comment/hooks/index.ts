import produce from "immer";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Updater } from "use-immer";

import { IPost } from "domain/Post/types";

import { createComment, createReply, fetchComments } from "../api";
import { CommentQueryData, ICommentForm, IReplyForm } from "../types";

export const useGetComments = (postId: string) => {
  return useQuery(["comments", postId], () => fetchComments(postId), {
    refetchOnMount: "always",
  });
};

export const useCreateComment = (setCommentForm?: Updater<ICommentForm>) => {
  const queryClient = useQueryClient();
  return useMutation(createComment, {
    onSuccess: ({ data: { comment, post } }) => {
      const data = queryClient.getQueryData<CommentQueryData>([
        "comments",
        post._id,
      ]);
      queryClient.setQueryData<{ post: IPost }>(["post", post._id], { post });
      if (data?.data.comments) {
        queryClient.setQueryData<CommentQueryData>(["comments", post._id], {
          ...data,
          data: { comments: [comment, ...data.data.comments] },
        });
      }
      if (!setCommentForm) return;
      setCommentForm((draft) => {
        draft.comment = "";
      });
    },
  });
};

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
