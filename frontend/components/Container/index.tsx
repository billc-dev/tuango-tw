import React, { FC } from "react";

const Container: FC = ({ children }) => {
  return (
    <div className="min-h-screen w-full dark:bg-zinc-900">
      <div className="mx-auto max-w-4xl">{children}</div>
    </div>
  );
};

export default Container;
