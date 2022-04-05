import React, { FC } from "react";

import { IMessage } from "../types";

interface Props {
  message: IMessage;
  isUserMessage: boolean;
}

const TextMessage: FC<Props> = ({ message, isUserMessage }) => {
  return (
    <p
      className={`px-2 py-1.5 m-1 inline-block rounded-xl ${
        isUserMessage
          ? "bg-line-400 text-white order-last"
          : "bg-zinc-200 dark:bg-zinc-600"
      }`}
    >
      {message.text}
    </p>
  );
};

export default TextMessage;
