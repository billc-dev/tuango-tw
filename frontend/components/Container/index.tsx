import React, { FC } from "react";

const Container: FC = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-zinc-100 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl">{children}</div>
    </div>
  );
};

export default Container;
