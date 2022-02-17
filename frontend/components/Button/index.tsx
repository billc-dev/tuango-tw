import AnimatedSpinner from "components/svg/AnimatedSpinner";
import React, { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "lg";
  variant?: "primary" | "secondary" | "danger";
  fullWidth?: boolean;
  iconButton?: JSX.Element;
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
    iconButton,
    loading,
    pill,
    ...rest
  } = props;
  const renderedChildren = () => {
    if (loading) return <AnimatedSpinner />;
    return (
      <>
        {iconButton}
        {children}
      </>
    );
  };
  const variantStyles = () => {
    if (!variant) return "";
    else if (variant === "primary") {
      return "bg-green-500 hover:bg-green-700";
    } else if (variant === "danger") {
      return "bg-red-500 hover:bg-red-700";
    } else return "bg-zinc-400";
  };
  return (
    <div className="p-1">
      <button
        className={`select-none py-1 px-3 text-white shadow transition hover:bg-zinc-600 disabled:text-gray-300 dark:text-gray-100 ${
          fullWidth ? "w-full" : ""
        } ${variantStyles()} ${size === "lg" ? "px-4 text-lg" : ""} ${
          pill ? "rounded-full" : "rounded-md"
        } ${className}`}
        {...rest}
      >
        {renderedChildren()}
      </button>
    </div>
  );
};

export default Button;
