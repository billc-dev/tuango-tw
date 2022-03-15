import React, { FC, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const index: FC<Props> = (props) => {
  return (
    <input
      type="checkbox"
      className="rounded cursor-pointer transition text-line-400 focus:ring-transparent focus:outline-transparent border-zinc-200 dark:border-zinc-600"
      {...props}
    />
  );
};

export default index;
