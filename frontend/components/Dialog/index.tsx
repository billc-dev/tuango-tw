import React, { FC, useEffect, useState } from "react";

import { XIcon } from "@heroicons/react/outline";

import IconButton from "../Button/IconButton";

interface DialogProps {
  open: boolean;
  handleClose: Function;
  title: string;
}

const Dialog: FC<DialogProps> = (props) => {
  const { children, open, handleClose, title } = props;
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setAnimate(true);
    }
    return () => {
      document.body.style.overflow = "initial";
    };
  }, [open]);
  return (
    <dialog
      open={open}
      className={`fixed top-0 z-10 h-full w-full overflow-x-hidden overscroll-y-auto bg-white p-0 transition-all duration-300 dark:bg-zinc-900 ${
        animate ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="sticky top-0 z-10 flex w-full items-center bg-white p-1 shadow dark:bg-zinc-800">
        <IconButton onClick={() => handleClose()}>
          <XIcon />
        </IconButton>
        <h1 className="truncate text-xl">{title}</h1>
      </div>
      <div className="mx-auto max-w-lg px-6 pb-4">{children}</div>
    </dialog>
  );
};

export default Dialog;
