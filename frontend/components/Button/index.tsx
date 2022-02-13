import React, { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "lg";
  type?: "primary" | "secondary" | "danger" | "gray";
  fullWidth?: boolean;
}

const Button: FC<Props> = (props) => {
  const { children, size, type, fullWidth, className, ...rest } = props;
  return (
    <div className="p-2">
      <button
        className={`select-none rounded-full bg-green-500 py-1 px-3 text-white shadow transition hover:bg-green-600 dark:text-gray-100 ${
          fullWidth && "w-full"
        } 
        ${type === "gray" && "bg-gray-400 hover:bg-gray-600"}
        ${size === "lg" && "py-2 text-xl"}
        ${className}`}
        {...rest}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
