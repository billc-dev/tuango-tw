import React, { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  selected: boolean;
}

const TabButton: FC<Props> = ({ selected, children, ...props }) => {
  return (
    <button
      className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all ${
        selected
          ? "bg-zinc-600 text-white shadow-inner dark:bg-white dark:text-zinc-700 dark:outline-none"
          : "hover:bg-zinc-300 dark:text-zinc-100 dark:outline-none dark:hover:bg-zinc-600"
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default TabButton;
