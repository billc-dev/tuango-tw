import React, { FC } from "react";

interface Props {
  onClick: () => void;
}

const Button: FC<Props> = ({ children, ...props }) => {
  return (
    <button
      className="ml-2 mt-2 select-none rounded-full bg-green-500 py-1 px-3 text-white shadow-lg transition hover:bg-green-600 dark:text-gray-100"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
