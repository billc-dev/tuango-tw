import React, { FC, useState } from "react";

import { PaperAirplaneIcon } from "@heroicons/react/outline";

import Button from "components/Button";

import { IPost } from "../types";
import MessageDialog from "./MessageDialog";

interface Props {
  post: IPost;
}

const MessageBuyerButton: FC<Props> = ({ post }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        icon={<PaperAirplaneIcon className="rotate-90" />}
        size="lg"
        className="mt-2"
        fullWidth
        onClick={() => setOpen(true)}
      >
        傳送訊息
      </Button>
      {open && <MessageDialog {...{ open, handleClose, post }} />}
    </>
  );
};

export default MessageBuyerButton;
