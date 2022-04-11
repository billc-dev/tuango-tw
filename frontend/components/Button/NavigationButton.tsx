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
      className={`w-full rounded-2xl transform py-2 transition active:bg-zinc-200 dark:active:bg-zinc-700 ${className}`}
      onClick={() => {
        if (!path) return;
        if (!selected) router.push(path);
      }}
      {...rest}
    >
      <div
        className={`flex flex-col items-center transition ${
          selected && "scale-[1.1] text-blue-600 dark:text-blue-400"
        }`}
      >
        <div className="h-6 w-6">{children}</div>
        <label className="select-none text-xs">{text}</label>
      </div>
    </button>
  );
};

export default NavigationButton;
