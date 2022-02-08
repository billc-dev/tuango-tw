import React, { FC } from "react";

const Card: FC = ({ children }) => {
  return (
    <div className="mt-2 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
      {children}
    </div>
  );
};

export default Card;
