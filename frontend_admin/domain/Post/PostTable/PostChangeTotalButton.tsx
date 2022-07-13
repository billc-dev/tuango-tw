import { FC, useState } from "react";

import { CashIcon } from "@heroicons/react/outline";

import IconButton from "components/Button/IconButton";

import PostTotalDialog from "./PostTotalDialog";

interface Props {
  postId: string;
}

const PostChangeTotalButton: FC<Props> = ({ postId }) => {
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
        <PostTotalDialog handleClose={handleClose} {...{ open, postId }} />
      )}
    </>
  );
};

export default PostChangeTotalButton;
