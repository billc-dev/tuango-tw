import { useRouter } from "next/router";
import React, { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  path?: string;
  text: string;
}

const NavigationButton: FC<Props> = (props) => {
  const { path, text, children, className, ...rest } = props;
  const router = useRouter();
  const selected = router.pathname === path;
  return (
    <button
      type="button"
      className={`flex w-full transform flex-col items-center transition py-2 active:bg-zinc-200 dark:active:bg-zinc-700 ${
        selected && "scale-[1.1] text-blue-500"
      } ${className}`}
      onClick={() => {
        if (!path) return;
        if (!selected) router.push(path);
      }}
      {...rest}
    >
      <div className="h-6 w-6">{children}</div>
      <label className="select-none text-xs">{text}</label>
    </button>
  );
};

export default NavigationButton;
