import * as notifyService from "api/notify/notifyService";
import { IPost } from "api/post/post";
import { IUser } from "api/user/userDB";
import { FRONTEND_URL } from "utils/url";

import { IComment } from "./comment";
import { Comment } from "./commentDB";
import {
  ICommentForm,
  IReplyForm,
  commentFormSchema,
  replyFormScheam,
} from "./commentSchema";

export const validateCommentForm = (commentForm: ICommentForm) => {
  return commentFormSchema.validate(commentForm, {
    abortEarly: true,
    stripUnknown: true,
  });
};

export const createNewComment = async (
  post: IPost,
  commentForm: ICommentForm,
  user: IUser
) => {
  const comment = new Comment({
    displayName: user.displayName,
    userId: user.username,
    postId: commentForm.postId,
    sellerId: post.userId,
    pictureUrl: user.pictureUrl,
    comment: commentForm.comment.trim(),
    createdAt: new Date().toISOString(),
  });

  await comment.save();

  return comment;
};

export const validateReplyForm = (replyForm: IReplyForm) => {
  return replyFormScheam.validate(replyForm, {
    abortEarly: true,
    stripUnknown: true,
  });
};

export const createReply = async (replyForm: IReplyForm, user: IUser) => {
  const reply = {
    userId: user.username,
    displayName: user.displayName,
    pictureUrl: user.pictureUrl,
    reply: replyForm.reply,
    createdAt: new Date().toISOString(),
  };

  const comment = await Comment.findByIdAndUpdate(
    replyForm.commentId,
    { $push: { replies: reply } },
    { new: true }
  );

  return comment;
};

export const notifyCommentOrReply = (
  type: "comment" | "reply",
  displayName: string,
  comment: string,
  postId: string,
  userId: string
) => {
  const message = `
✉️ ${displayName} ${type === "comment" ? "留言" : "回覆"}：${comment}
貼文連結: ${FRONTEND_URL}/posts?postId=${postId}&action=comment`;
  notifyService.notifyUser(userId, message);
};

export const getUserIdsToBeNotified = (comment: IComment) => {
  const userIds: string[] = [];
  const replierId = comment.replies[comment.replies.length - 1].userId;

  if (replierId !== comment.userId) userIds.push(comment.userId);

  for (let reply of comment.replies) {
    if (replierId === reply.userId) break;
    if (userIds.includes(reply.userId)) break;
    userIds.push(reply.userId);
  }

  return userIds;
};
