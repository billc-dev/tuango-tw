import React, { FC, HTMLAttributes } from "react";

import { useRouter } from "next/router";

interface Props extends HTMLAttributes<HTMLDivElement> {
  path?: string;
  text: string;
}

const NavigationButton: FC<Props> = ({ path, text, children, ...props }) => {
  const router = useRouter();
  const selected = router.pathname === path;
  return (
    <div
      className={`flex w-full transform flex-col items-center transition active:scale-[1.1]  ${
        selected && "scale-[1.1] text-blue-500"
      }`}
      onClick={() => {
        if (!path) return;
        if (!selected) router.push(path);
      }}
      {...props}
    >
      <div className="h-6 w-6">{children}</div>
      <label className="select-none text-xs">{text}</label>
    </div>
  );
};

export default NavigationButton;
