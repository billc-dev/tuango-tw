import React, { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  checkboxSize?: "large";
}

const index: FC<Props> = (props) => {
  const { checkboxSize, className, ...rest } = props;
  return (
    <input
      type="checkbox"
      className={`rounded cursor-pointer ml-1 focus:ring-transparent border-zinc-400 border-2 focus:  ${
        checkboxSize === "large" && "w-5 h-5"
      } ${className}`}
      {...rest}
    />
  );
};

export default index;
