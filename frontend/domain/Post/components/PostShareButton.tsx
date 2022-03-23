import React, { FC, useState } from "react";

import { ShareIcon } from "@heroicons/react/outline";

import Button from "components/Button";
import NormalDialog from "components/Dialog/NormalDialog";
import TextArea from "components/TextField/TextArea";

import { getPostUrl } from "../services";
import { IPost } from "../types";

interface Props {
  post: IPost;
}

const PostShareButton: FC<Props> = ({ post }) => {
  const [open, setOpen] = useState(false);
  const { postNum, title, displayName } = post;
  const [message, setMessage] = useState(
    `🤗#${postNum} ${title} ~${displayName}\n貼文連結: ${getPostUrl(post._id)}`
  );
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
            // onClick={() =>

            // }
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
