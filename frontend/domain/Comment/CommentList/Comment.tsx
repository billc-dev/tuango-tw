import React, { FC, useState } from "react";

import toast from "react-hot-toast";
import { useImmer } from "use-immer";

import Button from "components/Button";
import Card from "components/Card";
import CardHeader from "components/Card/CardHeader";
import TextArea from "components/TextField/TextArea";
import { getFullDate } from "services/date";

import { useCreateReply } from "../hooks";
import { IComment, IReplyForm } from "../types";

interface Props {
  comment: IComment;
}

const Comment: FC<Props> = ({ comment }) => {
  const [open, setOpen] = useState(false);
  const [replyForm, setReplyForm] = useImmer<IReplyForm>({
    commentId: comment._id,
    reply: "",
  });
  const createReply = useCreateReply(setReplyForm);
  const handleCreateReply = () => {
    toast.promise(createReply.mutateAsync({ replyForm }), {
      loading: "回覆傳送中...",
      success: "回覆已送出",
      error: "回覆傳送失敗",
    });
  };

  return (
    <Card>
      <div className="px-3 pb-3">
        <CardHeader
          title={comment.displayName}
          img={comment.pictureUrl}
          subtitle={getFullDate(comment.createdAt)}
        />
        <p className="-mt-2 whitespace-pre-wrap">{comment.comment}</p>
        {comment.replies.map((reply, index) => (
          <div key={index} className="pl-4">
            <CardHeader
              title={reply.displayName}
              img={reply.pictureUrl}
              subtitle={getFullDate(reply.createdAt)}
            />
            <p className="-mt-2 whitespace-pre-wrap">{reply.reply}</p>
          </div>
        ))}
        <div className="pt-2">
          {open ? (
            <>
              <TextArea
                value={replyForm.reply}
                placeholder="回覆"
                onChange={(e) =>
                  setReplyForm((draft) => {
                    draft.reply = e.target.value;
                  })
                }
              />
              <Button
                variant="primary"
                size="lg"
                fullWidth
                disabled={!replyForm.reply}
                onClick={() => handleCreateReply()}
              >
                回覆
              </Button>
            </>
          ) : (
            <Button onClick={() => setOpen(true)}>回覆</Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Comment;
