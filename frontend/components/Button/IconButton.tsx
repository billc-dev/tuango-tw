import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

import AnimatedSpinner from "components/svg/AnimatedSpinner";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  avatar?: JSX.Element;
  loading?: boolean;
}

const IconButton: FC<Props> = ({ children, avatar, loading, ...props }) => {
  const renderedChildren = () => {
    if (loading) return <AnimatedSpinner />;
    if (avatar) return avatar;
    return <div className="h-6 w-6">{children}</div>;
  };
  return (
    <button
      type="button"
      {...props}
      className={`flex items-center rounded-full p-2 active:bg-zinc-300 disabled:text-zinc-300 disabled:hover:bg-transparent disabled:active:bg-transparent dark:active:bg-zinc-600 dark:disabled:bg-transparent dark:disabled:text-zinc-500 md:hover:bg-zinc-300 md:dark:hover:bg-zinc-600 ${
        avatar && "p-0"
      }`}
    >
      {renderedChildren()}
    </button>
  );
};

export default IconButton;
