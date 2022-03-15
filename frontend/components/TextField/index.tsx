import React, { FC, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  height?: "tall";
  error?: string;
  color?: "grey";
  selectOnFocus?: boolean;
}

const TextField: FC<Props> = React.forwardRef((props, ref) => {
  const { height, error, color, label, selectOnFocus, ...rest } = props;
  return (
    <>
      {props.placeholder && (
        <label htmlFor={props.placeholder} className="block pb-2">
          {label ? label : props.placeholder}
        </label>
      )}
      <input
        autoComplete="off"
        ref={ref as any}
        onFocus={(e) => {
          selectOnFocus && e.target.select();
        }}
        className={`mb-2 w-full rounded-lg border px-3 border-zinc-200 placeholder-zinc-400 dark:border-zinc-600 ${
          height === "tall" ? "h-16" : "h-14"
        } ${
          !error
            ? "focus:border-line-400 focus:ring-line-400 focus:ring-1"
            : "border-red-500 ring-red-500 ring-1"
        } ${color === "grey" && "bg-zinc-100 dark:bg-zinc-800"}`}
        {...rest}
      />
      {error && (
        <p className="-mt-1 text-red-600 text-center text-sm">{error}</p>
      )}
    </>
  );
});

TextField.displayName = "TextField";

export default TextField;
