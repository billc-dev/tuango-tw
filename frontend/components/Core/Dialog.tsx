import { XIcon } from "@heroicons/react/outline";
import React, { FC, useEffect } from "react";
import IconButton from "./IconButton";

interface DialogProps {
  open: boolean;
  handleClose: Function;
  title: string;
}

const Dialog: FC<DialogProps> = (props) => {
  const { children, open, handleClose, title } = props;

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
  }, [open]);

  return open ? (
    <div className="fixed inset-0 z-50 h-screen overflow-x-hidden overscroll-y-auto bg-zinc-600">
      <div className="fixed flex w-full items-center p-3 dark:bg-zinc-700">
        <IconButton
          onClick={() => {
            document.body.style.overflow = "initial";
            handleClose();
          }}
        >
          <XIcon />
        </IconButton>
        <h1 className="truncate text-xl">{title}</h1>
      </div>
      <div className="mt-10">{children}</div>
    </div>
  ) : null;
};

export default Dialog;
