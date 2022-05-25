import React, { FC } from "react";

import { useImmer } from "use-immer";

import { Action } from "domain/Post/types";

import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { ICommentForm } from "./types";

interface Props {
  postId: string;
  action: Action;
}

const Comment: FC<Props> = ({ postId, action }) => {
  const [commentForm, setCommentForm] = useImmer<ICommentForm>({
    postId,
    comment: "",
  });
  return action === "comment" ? (
    <>
      <CommentForm commentForm={commentForm} setCommentForm={setCommentForm} />
      <CommentList postId={postId} />
    </>
  ) : null;
};

export default Comment;
