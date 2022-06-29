import React, { FC } from "react";

export interface MenuItem {
  icon?: JSX.Element;
  text: string;
  onClick?: () => void;
}

interface Props {
  open: boolean;
  handleClose: () => void;
  className?: string;
  items: MenuItem[];
}

const Menu: FC<Props> = ({ className, open, handleClose, items }) => {
  return open ? (
    <>
      <div
        className={`absolute select-none bg-zinc-200 dark:bg-zinc-700 overflow-hidden rounded-md shadow-lg whitespace-nowrap bottom-10 z-20 ${className}`}
      >
        {items.map((item) => (
          <button
            key={item.text}
            className="flex items-center px-6 py-4 active:bg-zinc-400"
            onClick={() => item.onClick && item.onClick()}
          >
            <div className="h-6 w-6 mr-4">{item.icon}</div>
            <span>{item.text}</span>
          </button>
        ))}
      </div>
      <div
        onClick={() => handleClose()}
        className="fixed top-0 left-0 w-screen h-screen z-10"
      />
    </>
  ) : null;
};

export default Menu;
