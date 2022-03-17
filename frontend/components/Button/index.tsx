import React, { ButtonHTMLAttributes, FC } from "react";

import AnimatedSpinner from "components/svg/AnimatedSpinner";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "lg";
  variant?: "primary" | "secondary" | "danger" | "inherit" | "orange";
  fullWidth?: boolean;
  icon?: JSX.Element;
  loading?: boolean;
  pill?: boolean;
}

const Button: FC<Props> = (props) => {
  const {
    children,
    size,
    variant,
    fullWidth,
    className,
    icon,
    loading,
    pill,
    disabled,
    ...rest
  } = props;
  const renderedChildren = () => {
    if (loading) {
      if (size === "lg")
        return (
          <div className="my-0.5">
            <AnimatedSpinner />
          </div>
        );
      return <AnimatedSpinner />;
    }
    return (
      <>
        {icon && <div className="h-5 w-5 mr-1">{icon}</div>}
        {children}
      </>
    );
  };
  const variantStyles = () => {
    if (!variant) {
      return "bg-zinc-200 hover:bg-zinc-400 text-zinc-900 dark:bg-zinc-300 dark:hover:bg-zinc-400";
    } else if (variant === "primary") {
      return "bg-line-400 hover:bg-line-800 text-white";
    } else if (variant === "danger") {
      return "bg-red-500 hover:bg-red-700 text-white";
    } else if (variant === "inherit") {
      return "hover:bg-zinc-100 dark:hover:bg-zinc-700";
    } else if (variant === "orange") {
      return "bg-orange-500 hover:bg-orange-700 text-white";
    }
  };
  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={`flex items-center justify-center select-none py-1 px-3 shadow transition disabled:bg-zinc-300 disabled:text-zinc-400  ${
        fullWidth ? "w-full" : ""
      } ${variantStyles()} ${size === "lg" ? "px-4 text-lg" : ""} ${
        pill ? "rounded-full" : "rounded-md"
      } ${className}`}
      {...rest}
    >
      {renderedChildren()}
    </button>
  );
};

export default Button;
