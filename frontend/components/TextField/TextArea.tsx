import React, { FC } from "react";

import { TextareaAutosizeProps } from "react-textarea-autosize";
import TextareaAutosize from "react-textarea-autosize";

const TextArea: FC<
  TextareaAutosizeProps & React.RefAttributes<HTMLTextAreaElement>
> = (props) => {
  return (
    <TextareaAutosize
      className="focus:border-line-400 focus:ring-line-400 mb-2 w-full rounded-lg border py-4 px-3 placeholder-gray-400 focus:ring-1 dark:bg-zinc-700"
      {...props}
    />
  );
};

export default TextArea;
