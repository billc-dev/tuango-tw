import React, { FC } from "react";

interface Props {
  className?: string;
}

const Card: FC<Props> = ({ children, className }) => {
  return (
    <div
      className={`mt-2 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
