import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  avatar?: JSX.Element;
}

const IconButton: FC<Props> = ({ children, avatar, ...props }) => {
  return (
    <button
      {...props}
      className={`flex items-center rounded-full p-2 active:bg-zinc-300 disabled:text-gray-300 disabled:hover:bg-transparent disabled:active:bg-transparent dark:active:bg-zinc-600 sm:hover:bg-zinc-300 sm:dark:hover:bg-zinc-600 ${
        avatar && "p-0"
      }`}
    >
      {avatar ? avatar : <div className="h-6 w-6">{children}</div>}
    </button>
  );
};

export default IconButton;
