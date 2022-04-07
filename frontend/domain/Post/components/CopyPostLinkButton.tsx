import React, { FC } from "react";

import { LinkIcon } from "@heroicons/react/outline";
import toast from "react-hot-toast";

import Button from "components/Button";

import { getPostUrl } from "../services";
import { IPost } from "../types";

interface Props {
  post: IPost;
}

const CopyPostLinkButton: FC<Props> = ({ post }) => {
  const { _id, postNum, title, displayName } = post;

  return (
    <Button
      icon={<LinkIcon />}
      fullWidth
      variant="primary"
      className="mb-2"
      onClick={() => {
        navigator.clipboard.writeText(
          `🤗#${postNum} ${title} ~${displayName}\n貼文連結: ${getPostUrl(_id)}`
        );
        toast.success("已複製貼文連結！");
      }}
    >
      複製分享連結
    </Button>
  );
};

export default CopyPostLinkButton;
