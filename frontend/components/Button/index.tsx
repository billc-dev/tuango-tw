import AnimatedSpinner from "components/svg/AnimatedSpinner";
import React, { ButtonHTMLAttributes, FC } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
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
    if (!variant) return "bg-zinc-300 hover:bg-zinc-400 text-zinc-900";
    else if (variant === "primary") {
      return "bg-line-400 hover:bg-line-800 text-white";
    } else if (variant === "danger") {
      return "bg-red-500 hover:bg-red-700 text-white";
    }
  };
  return (
    <button
      className={`select-none py-1 px-3 shadow transition disabled:bg-zinc-300  ${
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
