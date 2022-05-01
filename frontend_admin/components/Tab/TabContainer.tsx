import React, { FC } from "react";

interface Props {
  className?: string;
}

const TabContainer: FC<Props> = ({ children, className }) => {
  return (
    <div
      className={`flex select-none space-x-1 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800 ${className}`}
    >
      {children}
    </div>
  );
};

export default TabContainer;
