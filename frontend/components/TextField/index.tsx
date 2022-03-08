import React, { FC, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  height?: "tall";
  error?: string;
  color?: "grey";
}

const TextField: FC<Props> = React.forwardRef((props, ref) => {
  const { height, error, color, ...rest } = props;
  return (
    <>
      {props.placeholder && (
        <label htmlFor={props.placeholder} className="block pb-2">
          {props.placeholder}
        </label>
      )}
      <input
        ref={ref as any}
        className={`mb-2 w-full rounded-lg border px-3  placeholder-zinc-400 dark:border-zinc-600 ${
          height === "tall" ? "h-16" : "h-14"
        } ${
          !error
            ? "focus:border-line-400 focus:ring-line-400 focus:ring-1"
            : "border-red-500 ring-red-500 ring-1"
        } ${color === "grey" && "bg-zinc-100 dark:bg-zinc-800"}`}
        {...rest}
      />
    </>
  );
});

TextField.displayName = "TextField";

export default TextField;
