import React, { FC, useEffect, useRef, useState } from "react";

import { ArrowLeftIcon } from "@heroicons/react/outline";

import IconButton from "../Button/IconButton";

interface DialogProps
  extends React.DetailedHTMLProps<
    React.DialogHTMLAttributes<HTMLDialogElement>,
    HTMLDialogElement
  > {
  open: boolean;
  handleClose: Function;
  title: string;
  id?: string;
  className?: string;
}

const Dialog: FC<DialogProps> = (props) => {
  const { children, open, handleClose, title, id, className } = props;
  const [animate, setAnimate] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setAnimate(true);
      ref.current?.focus();
    }
    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [open]);

  return (
    <dialog
      id={id}
      open={open}
      className={`fixed top-0 left-0 inset-0 z-10 h-full w-full overflow-x-hidden overscroll-y-auto bg-white p-0 transition-all duration-300 dark:bg-zinc-900 ${
        animate ? "opacity-100" : "opacity-0"
      } ${className}`}
    >
      <div className="sticky top-0 z-10 flex w-full items-center bg-white p-1 shadow dark:bg-zinc-800">
        <IconButton onClick={() => handleClose()}>
          <ArrowLeftIcon />
        </IconButton>
        <h1 className="line-clamp-1 text-xl dark:text-white pr-2">{title}</h1>
      </div>
      <div ref={ref} className="mx-auto max-w-lg px-4 pb-4 dark:text-white">
        {children}
      </div>
    </dialog>
  );
};

export default Dialog;
