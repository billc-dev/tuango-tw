import React, { FC } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  radioSize?: "lg";
  label?: string;
}

const Radio: FC<Props> = (props) => {
  const { radioSize, label, className, ...rest } = props;
  return (
    <label
      className={`flex items-center cursor-pointer ${
        radioSize === "lg" && "mt-4"
      }`}
    >
      <input
        className={`${radioSize === "lg" && "h-6 w-6"} ${className}`}
        type="radio"
        {...rest}
      />
      <span className={`${radioSize === "lg" ? "ml-3 text-lg" : "ml-2"}`}>
        {label}
      </span>
    </label>
  );
};

export default Radio;
