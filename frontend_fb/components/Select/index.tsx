import React, { FC, SelectHTMLAttributes } from "react";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
}

const Select: FC<Props> = React.forwardRef((props, ref) => {
  const { options, className, ...rest } = props;
  return (
    <select
      ref={ref as any}
      className={`rounded-lg w-full bg-zinc-100 border-zinc-200 dark:bg-zinc-800 dark:border-zinc-600 mb-2 focus:border-line-400 focus:ring-line-400 ${className}`}
      {...rest}
    >
      {options.map((option, index) => (
        <option key={option.value + index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});

Select.displayName = "Select";

export default Select;
