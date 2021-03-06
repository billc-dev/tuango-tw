import React, { FC, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  noLabel?: boolean;
  height?: "tall";
  error?: string;
  color?: "grey";
  selectOnFocus?: boolean;
  variant?: "standard";
  className?: string;
}

const TextField: FC<Props> = React.forwardRef((props, ref) => {
  const {
    height,
    error,
    color,
    label,
    selectOnFocus,
    variant,
    noLabel,
    className,
    ...rest
  } = props;
  return (
    <>
      {!noLabel && props.placeholder && (
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
        className={`focus:ring-0 text-base ring-0 placeholder-zinc-400 disabled:opacity-60
        ${
          !variant
            ? "rounded-lg border px-3 w-full mb-2 border-zinc-200 dark:border-zinc-600 dark:bg-zinc-800"
            : "border-0 border-b border-zinc-400 px-0 rounded-none"
        }
        ${!variant ? (height === "tall" ? "h-16" : "h-14") : "h-10"} ${
          !error
            ? `focus:border-line-400 ${
                !variant
                  ? "focus:ring-line-400 focus:ring-1"
                  : "focus:border-b-2 hover:border-b-2"
              }`
            : "border-red-500 ring-red-500 ring-1"
        } ${color === "grey" && "bg-zinc-100 dark:bg-zinc-800"} ${className}`}
        {...rest}
      />
      {error && (
        <p
          className={`text-red-600 text-sm ${
            variant !== "standard" && "-mt-1 text-center"
          }`}
        >
          {error}
        </p>
      )}
    </>
  );
});

TextField.displayName = "TextField";

export default TextField;
