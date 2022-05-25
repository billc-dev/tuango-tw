import React, { FC, useState } from "react";

import { CashIcon } from "@heroicons/react/outline";

import IconButton from "components/Button/IconButton";

import { IPost } from "../types";
import PostTotalDialog from "./PostTotalDialog";

interface Props {
  post: IPost;
}

const PostChangeTotalCell: FC<Props> = ({ post }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <CashIcon />
      </IconButton>
      {open && (
        <PostTotalDialog open={open} handleClose={handleClose} post={post} />
      )}
    </>
  );
};

export default PostChangeTotalCell;
