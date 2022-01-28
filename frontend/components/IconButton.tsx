import React, { FC, SVGProps } from "react";

interface Props {
  onClick: Function;
}

const IconButton: FC<Props> = ({ children, onClick }) => {
  return (
    <div
      className="-m-2 mr-1 rounded-full p-2 opacity-70 hover:bg-zinc-800 hover:text-green-500"
      onClick={() => onClick()}
    >
      <div className="h-6 w-6">{children}</div>
    </div>
  );
};

export default IconButton;
