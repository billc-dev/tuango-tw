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
    `ð¤#${postNum} ${title} ~${displayName}\nè²¼æé£çµ: ${getPostUrl(post._id)}`
  );
  const handleClick = () => {
    toast.loading("æ¨æ­ä¸­...", { id: "notifyGroups" });
    notifyGroups.mutate(
      { postId: _id, message },
      {
        onSuccess: () => {
          toast.success("æ¨æ­æåï¼", { id: "notifyGroups" });
          setOpen(false);
        },
        onError: () => {
          toast.error("æ¨æ­å¤±æï¼", { id: "notifyGroups" });
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
        æ¨æ­å°1~4å
      </Button>
      <NormalDialog {...{ open, setOpen, title: "æ¨ç¢ºå®è¦æ¨æ­å°1~4ååï¼" }}>
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
            ç¢ºå®
          </Button>
          <Button size="lg" onClick={() => setOpen(false)}>
            åæ¶
          </Button>
        </div>
      </NormalDialog>
    </>
  );
};

export default PostShareButton;
