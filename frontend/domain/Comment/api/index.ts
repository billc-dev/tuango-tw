import axios, { AxiosResponse } from "axios";

import { IPost } from "domain/Post/types";

import { IComment, ICommentForm, IReplyForm } from "../types";

export const fetchComments = (
  postId: string
): Promise<AxiosResponse<{ comments: IComment[] }>> => {
  return axios.get(`/comments/post/${postId}`);
};

type CreateComment = (variables: {
  commentForm: ICommentForm;
}) => Promise<AxiosResponse<{ comment: IComment; post: IPost }>>;

export const createComment: CreateComment = ({ commentForm }) => {
  return axios.post("/comments/comment", { commentForm });
};

type CreateReply = (variables: {
  replyForm: IReplyForm;
}) => Promise<AxiosResponse<{ comment: IComment }>>;

export const createReply: CreateReply = ({ replyForm }) => {
  return axios.post("/comments/reply", { replyForm });
};
