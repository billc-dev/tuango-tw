import React, { FC, InputHTMLAttributes } from "react";

const TextField: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return (
    <input
      className="outline-line-400 mb-2 w-full rounded-lg border py-4 px-3 text-base placeholder-gray-400 focus:outline focus:outline-1"
      type="text"
      {...props}
    />
  );
};

export default TextField;
