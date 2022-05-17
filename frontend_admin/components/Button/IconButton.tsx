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

const IconButton: FC<Props> = ({
  children,
  avatar,
  loading,
  disabled,
  ...props
}) => {
  const renderedChildren = () => {
    if (loading) return <AnimatedSpinner />;
    if (avatar) return avatar;
    return <div className="h-6 w-6">{children}</div>;
  };
  return (
    <button
      disabled={loading || disabled}
      type="button"
      {...props}
      className={`flex items-center rounded-full p-2 active:bg-zinc-300 disabled:text-zinc-300  disabled:hover:bg-transparent disabled:active:bg-transparent md:hover:bg-zinc-200  ${
        avatar && "p-0"
      }`}
    >
      {renderedChildren()}
    </button>
  );
};

export default IconButton;
