import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const IconButton: FC<Props> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="rounded-full p-2 active:bg-zinc-300 disabled:text-gray-300 disabled:hover:bg-transparent disabled:active:bg-transparent dark:active:bg-zinc-600 sm:hover:bg-zinc-300 sm:dark:hover:bg-zinc-600"
    >
      <div className="h-6 w-6">{children}</div>
    </button>
  );
};

export default IconButton;
