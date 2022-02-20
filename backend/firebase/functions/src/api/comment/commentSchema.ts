import * as yup from "yup";

export const commentFormSchema = yup.object({
  postId: yup.string().required(),
  comment: yup.string().required(),
});

export interface ICommentForm extends yup.InferType<typeof commentFormSchema> {}

export const replyFormScheam = yup.object({
  commentId: yup.string().required(),
  reply: yup.string().required(),
});

export interface IReplyForm extends yup.InferType<typeof replyFormScheam> {}
