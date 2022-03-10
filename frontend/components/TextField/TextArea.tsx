import React, { FC } from "react";

import { TextareaAutosizeProps } from "react-textarea-autosize";
import TextareaAutosize from "react-textarea-autosize";

interface Props
  extends TextareaAutosizeProps,
    React.RefAttributes<HTMLTextAreaElement> {
  color?: "grey";
  label?: string;
  error?: string;
}

const TextArea: FC<Props> = React.forwardRef((props, ref) => {
  const { color, error, ...rest } = props;
  return (
    <>
      {props.placeholder && (
        <label htmlFor={props.placeholder} className="block pb-2">
          {props.placeholder}
        </label>
      )}
      <TextareaAutosize
        className={`mb-2 w-full rounded-lg border py-4 px-3 placeholder-zinc-400 border-zinc-200 dark:border-zinc-600 dark:bg-zinc-800 ${
          color === "grey" && "bg-zinc-100"
        } ${
          !error
            ? "focus:border-line-400 focus:ring-line-400 focus:ring-1"
            : "border-red-500 ring-red-500 ring-1"
        }`}
        ref={ref}
        {...rest}
      />
      {error && (
        <p className="-mt-1 text-red-600 text-center text-sm">{error}</p>
      )}
    </>
  );
});

TextArea.displayName = "TextArea";

export default TextArea;
