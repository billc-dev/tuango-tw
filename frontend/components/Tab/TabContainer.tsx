import React, { FC } from "react";

const TabContainer: FC = ({ children }) => {
  return (
    <div className="flex select-none space-x-1 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800">
      {children}
    </div>
  );
};

export default TabContainer;
