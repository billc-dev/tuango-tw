import React, { FC, useEffect, useRef, useState } from "react";

import { XIcon } from "@heroicons/react/outline";

import Button from "components/Button";
import IconButton from "components/Button/IconButton";

interface DialogProps
  extends React.DetailedHTMLProps<
    React.DialogHTMLAttributes<HTMLDialogElement>,
    HTMLDialogElement
  > {
  open: boolean;
  handleClose: () => void;
  title: string;
  id?: string;
  className?: string;
  action?: React.ReactNode;
  confirmComponent?: boolean;
  onConfirm?: () => void;
  loading?: boolean;
}

const PopupDialog: FC<DialogProps> = (props) => {
  const { children, open, handleClose, title, id, className, action } = props;
  const { confirmComponent, onConfirm, loading } = props;
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
  return open ? (
    <>
      <dialog
        id={id}
        open={open}
        className={`fixed z-20 overflow-x-hidden overscroll-y-auto bg-white p-0 transition-opacity duration-300 top-0 left-0 inset-0 max-w-[98%] max-h-[95%] bottom-0 rounded shadow-lg dark:ring-1 ring-zinc-700 ${
          animate ? "opacity-100" : "opacity-0"
        } ${className}`}
      >
        <div>
          <div className="sticky top-0 z-10 flex w-full items-center bg-white p-1 dark:bg-zinc-800">
            <div className="flex w-full justify-between items-center mr-3">
              <div className="flex items-center">
                <IconButton onClick={() => handleClose()}>
                  <XIcon />
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
            {confirmComponent && (
              <div className="flex mt-8 justify-end">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={onConfirm}
                  loading={loading}
                >
                  確定
                </Button>
                <Button size="lg" onClick={handleClose} className="ml-2">
                  取消
                </Button>
              </div>
            )}
          </div>
        </div>
      </dialog>
      <div
        className={` z-10 fixed top-0 left-0 h-screen w-screen transition-opacity duration-300 bg-zinc-900/50 dark:bg-zinc-900/60 ${
          animate ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => handleClose()}
      />
    </>
  ) : null;
};

export default PopupDialog;
