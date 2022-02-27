import React, { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Card: FC<Props> = ({ children, className, ...props }) => {
  return (
    <div
      className={`mt-2 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
