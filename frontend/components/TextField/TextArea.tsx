import React, { FC } from "react";
import { TextareaAutosizeProps } from "react-textarea-autosize";
import TextareaAutosize from "react-textarea-autosize";

const TextArea: FC<
  TextareaAutosizeProps & React.RefAttributes<HTMLTextAreaElement>
> = (props) => {
  return (
    <TextareaAutosize
      className="outline-line-400 mb-2 w-full rounded-lg border py-4 px-3 text-base placeholder-gray-400 focus:outline focus:outline-1"
      {...props}
    />
  );
};

export default TextArea;
