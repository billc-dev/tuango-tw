import React, { ButtonHTMLAttributes, FC } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: JSX.Element;
  text: string;
}

const SquareButton: FC<Props> = ({ Icon, text, ...props }) => {
  return (
    <button
      type="button"
      className="py-4 flex flex-col items-center justify-center active:bg-zinc-100 dark:active:bg-zinc-800 transition"
      {...props}
    >
      <div className="rounded-lg bg-zinc-300 p-4 dark:bg-zinc-700 transition">
        <div className="h-12 w-12 text-white dark:text-zinc-200">{Icon}</div>
      </div>
      <p className="pt-2">{text}</p>
    </button>
  );
};

export default SquareButton;
