import React, { FC, useState } from "react";

import { ShareIcon } from "@heroicons/react/outline";
import toast from "react-hot-toast";

import Button from "components/Button";
import NormalDialog from "components/Dialog/NormalDialog";
import TextArea from "components/TextField/TextArea";

import { useNotifyGroups } from "../hooks";
import { getPostUrl } from "../services";
import { IPost } from "../types";

interface Props {
  post: IPost;
}

const PostShareButton: FC<Props> = ({ post }) => {
  const notifyGroups = useNotifyGroups();
  const [open, setOpen] = useState(false);
  const { _id, postNum, title, displayName } = post;
  const [message, setMessage] = useState(
    `🤗#${postNum} ${title} ~${displayName}\n貼文連結: ${getPostUrl(post._id)}`
  );
  const handleClick = () => {
    toast.loading("推播中...", { id: "notifyGroups" });
    notifyGroups.mutate(
      { postId: _id, message },
      {
        onSuccess: () => {
          toast.success("推播成功！", { id: "notifyGroups" });
          setOpen(false);
        },
        onError: () => {
          toast.error("推播失敗！", { id: "notifyGroups" });
        },
      }
    );
  };
  return (
    <>
      <Button
        icon={<ShareIcon />}
        fullWidth
        className="mb-2"
        onClick={() => setOpen(true)}
      >
        推播到1~4團
      </Button>
      <NormalDialog {...{ open, setOpen, title: "您確定要推播到1~4團嗎？" }}>
        <TextArea
          autoFocus
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          minRows={8}
          rows={8}
        />
        <div className="flex justify-end gap-2 pt-2">
          <Button
            size="lg"
            variant="primary"
            onClick={() => handleClick()}
            loading={notifyGroups.isLoading}
          >
            確定
          </Button>
          <Button size="lg" onClick={() => setOpen(false)}>
            取消
          </Button>
        </div>
      </NormalDialog>
    </>
  );
};

export default PostShareButton;
