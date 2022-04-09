import React, { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  checkboxSize?: "large";
}

const index: FC<Props> = (props) => {
  const { checkboxSize, ...rest } = props;
  return (
    <input
      type="checkbox"
      className={`rounded cursor-pointer transition text-line-400 focus:ring-transparent focus:outline-transparent border-zinc-200 dark:border-zinc-600 ${
        checkboxSize === "large" && "p-2"
      }`}
      {...rest}
    />
  );
};

export default index;
