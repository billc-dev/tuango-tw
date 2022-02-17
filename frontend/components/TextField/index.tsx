import React, { FC, InputHTMLAttributes } from "react";

const TextField: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return (
    <input
      className="focus:border-line-400 focus:ring-line-400 mb-2 w-full rounded-lg border py-4 px-3 placeholder-gray-400 focus:ring-1"
      type="text"
      {...props}
    />
  );
};

export default TextField;
