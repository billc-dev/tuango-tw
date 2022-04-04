import { useRouter } from "next/router";
import React, { FC, useRef, useState } from "react";

import { PaperAirplaneIcon } from "@heroicons/react/outline";
import TextareaAutosize from "react-textarea-autosize";

import IconButton from "components/Button/IconButton";

import { useIsSendingMessage, useSendMessage } from "../hooks";
import MessageActions from "./MessageActions";
import SendOrder from "./SendOrder";
import SendPost from "./SendPost";

interface Props {
  roomId: string;
}

const MessageBar: FC<Props> = ({ roomId }) => {
  const { query } = useRouter();
  const ref = useRef<HTMLTextAreaElement>(null);
  const isSendingMessage = useIsSendingMessage();
  const sendMessage = useSendMessage();
  const [text, setText] = useState("");
  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage.mutate(
      { roomId, type: "text", payload: text },
      {
        onSuccess: () => {
          setText("");
        },
      }
    );
    ref.current?.focus();
  };

  return (
    <>
      <div className="fixed flex max-w-lg items-center bottom-0 px-2 -mx-4 w-full top-auto min-h-[48px] bg-zinc-200 dark:bg-zinc-600">
        <MessageActions roomId={roomId} />
        <TextareaAutosize
          value={text}
          onChange={(e) => setText(e.target.value)}
          ref={ref}
          placeholder="輸入訊息"
          maxRows={5}
          className="border-none px-0 my-2 py-0 w-full focus:ring-0 bg-zinc-200 dark:bg-zinc-600"
        />
        <IconButton onClick={handleSend} loading={isSendingMessage.data}>
          <PaperAirplaneIcon className="rotate-90 text-zinc-700" />
        </IconButton>
      </div>
      {query["send_order"] === "open" && <SendOrder />}
      {query["send_post"] === "open" && <SendPost />}
    </>
  );
};

export default MessageBar;
