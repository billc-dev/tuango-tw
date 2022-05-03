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
  action?: React.ReactNode;
}

const Dialog: FC<DialogProps> = (props) => {
  const { children, open, handleClose, title, id, className, action } = props;
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
    <>
      <dialog
        id={id}
        open={open}
        className={`fixed z-20 overflow-x-hidden overscroll-y-auto first:bg-white p-0 transition-opacity duration-300 dark:bg-zinc-900 top-0 left-0 inset-0 w-full h-full md:max-w-md md:w-fit md:min-w-[512px] md:max-h-[95%] md:bottom-0 md:rounded md:shadow-lg md:dark:ring-1 md:ring-zinc-700 ${
          animate ? "opacity-100" : "opacity-0"
        } ${className}`}
      >
        <div>
          <div className="sticky top-0 z-10 flex w-full items-center bg-white p-1 shadow dark:bg-zinc-800">
            <div className="flex w-full justify-between items-center mr-3">
              <div className="flex items-center">
                <IconButton onClick={() => handleClose()}>
                  <ArrowLeftIcon />
                </IconButton>
                <h1 className="line-clamp-1 text-xl dark:text-white pr-2">
                  {title}
                </h1>
              </div>
              <div>{action}</div>
            </div>
          </div>
          <div ref={ref} className="mx-auto max-w-lg px-4 pb-4 dark:text-white">
            {children}
          </div>
        </div>
      </dialog>
      <div
        className={`hidden md:block z-10 fixed top-0 left-0 h-screen w-screen transition-opacity duration-300 bg-zinc-900/50 dark:bg-zinc-900/60 ${
          animate ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => handleClose()}
      />
    </>
  );
};

export default Dialog;
