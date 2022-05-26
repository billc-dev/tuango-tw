import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

import AnimatedSpinner from "components/svg/AnimatedSpinner";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  avatar?: JSX.Element;
  loading?: boolean;
  variant?: "contained";
}

const IconButton: FC<Props> = (props) => {
  const { children, avatar, loading, disabled, variant, ...rest } = props;
  const renderedChildren = () => {
    if (loading) return <AnimatedSpinner />;
    if (avatar) return avatar;
    return <div className="h-6 w-6">{children}</div>;
  };
  return (
    <button
      disabled={loading || disabled}
      type="button"
      {...rest}
      className={`flex items-center transition-colors rounded-full p-2 active:bg-zinc-300 disabled:text-zinc-300  disabled:hover:bg-transparent disabled:active:bg-transparent md:hover:bg-zinc-200 ${
        variant === "contained" && "bg-zinc-100"
      } ${avatar && "p-0"}`}
    >
      {renderedChildren()}
    </button>
  );
};

export default IconButton;
