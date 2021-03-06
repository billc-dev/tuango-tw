import React, { FC } from "react";

export interface MenuItem {
  icon?: JSX.Element;
  text: string;
  onClick?: () => void;
}

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  open: boolean;
  handleClose: () => void;
  className?: string;
  items: MenuItem[];
}

const Menu: FC<Props> = ({ className, open, handleClose, items, children }) => {
  return open ? (
    <>
      <div
        className={`absolute select-none bg-white overflow-hidden ring-1 ring-zinc-200 rounded-md whitespace-nowrap top-10 z-20 ${className}`}
      >
        {items.map((item) => (
          <div key={item.text}>
            <button
              type="button"
              className="flex w-full items-center justify-center px-5 py-3 transition active:bg-zinc-400 hover:bg-zinc-200"
              onClick={() => item.onClick && item.onClick()}
            >
              {item.icon && <div className="h-6 w-6 mr-4">{item.icon}</div>}
              <span>{item.text}</span>
            </button>
          </div>
        ))}
        {children}
      </div>
      <div
        onClick={() => handleClose()}
        className="fixed top-0 left-0 w-screen h-screen z-10"
      />
    </>
  ) : null;
};

export default Menu;
