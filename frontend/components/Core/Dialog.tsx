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
    <div className="fixed inset-0 h-screen overflow-x-hidden overscroll-y-auto bg-white dark:bg-zinc-700">
      <div className="fixed z-10 flex w-full items-center p-3 shadow dark:bg-zinc-800">
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
