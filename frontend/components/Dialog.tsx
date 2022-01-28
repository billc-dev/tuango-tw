import React, { FC } from "react";
import { XIcon } from "@heroicons/react/outline";
import IconButton from "./IconButton";

interface DialogProps {
  open: boolean;
  setOpen: Function;
  handleClose: Function;
  title: string;
}

const Dialog: FC<DialogProps> = ({ children, open, handleClose, title }) => {
  return open ? (
    <div className="overscroll-y-scroll fixed inset-0 z-50 h-screen overflow-x-hidden bg-zinc-600">
      <div className="fixed flex  w-full bg-zinc-700 p-4">
        <IconButton onClick={() => handleClose()}>
          <XIcon />
        </IconButton>
        {/* <p className="truncate">{post.title}</p> */}
      </div>
      {/* <div className="mt-12 whitespace-pre-line p-4">{post.body}</div> */}
    </div>
  ) : null;
};

export default Dialog;
