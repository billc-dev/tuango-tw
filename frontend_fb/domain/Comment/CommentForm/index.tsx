import React, { FC } from "react";

import toast from "react-hot-toast";
import { Updater } from "use-immer";

import Card from "components/Card";
import CardSubmitButton from "components/Card/CardSubmitButton";
import TextArea from "components/TextField/TextArea";
import { useScrollIntoView } from "hooks/useScrollIntoView";

import { useCreateComment, useGetComments } from "../hooks";
import { ICommentForm } from "../types";

interface Props {
  commentForm: ICommentForm;
  setCommentForm: Updater<ICommentForm>;
}

const CommentForm: FC<Props> = ({ commentForm, setCommentForm }) => {
  const { isLoading } = useGetComments(commentForm.postId);
  const { ref } = useScrollIntoView(isLoading, "comment");
  const createComment = useCreateComment(setCommentForm);
  const handleCreateComment = () => {
    toast.promise(createComment.mutateAsync({ commentForm }), {
      loading: "問題傳送中...",
      success: "問題已送出",
      error: "問題傳送失敗",
    });
  };
  return (
    <Card>
      <div className="relative px-2 pt-3">
        <div ref={ref} className="absolute -top-12" />
        <TextArea
          autoFocus
          hiddenLabel
          placeholder="問題"
          value={commentForm.comment}
          onChange={(e) =>
            setCommentForm((draft) => {
              draft.comment = e.target.value;
            })
          }
        />
      </div>
      <CardSubmitButton
        disabled={!commentForm.comment}
        onClick={() => handleCreateComment()}
      >
        新增問題
      </CardSubmitButton>
    </Card>
  );
};

export default CommentForm;
