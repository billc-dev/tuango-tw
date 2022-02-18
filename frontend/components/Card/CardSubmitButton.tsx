import AnimatedSpinner from "components/svg/AnimatedSpinner";
import React, { ButtonHTMLAttributes, FC } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const CardSubmitButton: FC<Props> = ({
  children,
  loading,
  disabled,
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      className="bg-line-400 hover:bg-line-700 active:bg-line-800 flex h-12 w-full items-center justify-center text-lg font-semibold text-white transition disabled:bg-zinc-300 dark:disabled:bg-zinc-600"
      {...props}
    >
      {loading ? <AnimatedSpinner /> : children}
    </button>
  );
};

export default CardSubmitButton;
