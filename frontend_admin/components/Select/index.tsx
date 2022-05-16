import React, { FC, SelectHTMLAttributes } from "react";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: any; label: string; disabled?: boolean }[];
  variant?: "contained";
  height?: "normal" | "tall";
}

const Select: FC<Props> = React.forwardRef((props, ref) => {
  const { options, className, variant, height, ...rest } = props;
  const getVariant = () => {
    switch (variant) {
      case "contained":
        return "rounded-lg border-zinc-200 bg-zinc-100 mb-2 px-2 py-1 focus:border-line-400 focus:ring-line-400";
      default:
        return "border-zinc-400 border-0 border-b p-0 focus:ring-0 focus:border-0 focus:border-b focus:border-line-400";
    }
  };
  const getHeight = () => {
    switch (height) {
      case "normal":
        return "h-10";
      case "tall":
        return "h-14";
      default:
        return "";
    }
  };
  return (
    <select
      ref={ref as any}
      className={`w-full cursor-pointer dark:bg-zinc-800 dark:border-zinc-600 ${getHeight()} ${getVariant()} ${className}`}
      {...rest}
    >
      {options.map((option, index) => (
        <option
          key={option.label + index}
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
});

Select.displayName = "Select";

export default Select;
