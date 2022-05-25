import React, { FC, useState } from "react";

import { PaperAirplaneIcon } from "@heroicons/react/outline";
import toast from "react-hot-toast";

import Button from "components/Button";
import Select from "components/Select";
import TextArea from "components/TextField/TextArea";
import { getYesterday } from "services/date";

import { useSendMessage } from "../hooks";
import { MessageOrderQuery } from "../types";

interface Props {
  userIds: string[];
  setUserIds: React.Dispatch<React.SetStateAction<string[]>>;
  query: MessageOrderQuery;
  setQuery: React.Dispatch<React.SetStateAction<MessageOrderQuery>>;
}

const Messager: FC<Props> = ({ userIds, setUserIds, query, setQuery }) => {
  const sendMessage = useSendMessage();
  const [message, setMessage] = useState("");
  const handleSend = () => {
    sendMessage.mutate(
      { userIds, message, query },
      {
        onSuccess: () => {
          setUserIds([]);
          setQuery({ deliveredAt: getYesterday(), status: "" });
          setMessage("");
        },
        onError: () => {
          toast.error("傳送訊息失敗!");
        },
      }
    );
  };
  return (
    <div>
      <Select
        className="w-auto mb-2"
        value={message}
        height="normal"
        options={[
          {
            value: "",
            label: "",
          },
          {
            value: "😘 請記得過來拿東西喔！",
            label: "😘 請記得過來拿東西喔！",
          },
          {
            value: "⚠️ 體積龐大，請趕快來拿喔！",
            label: "⚠️ 體積龐大，請趕快來拿喔！",
          },
          {
            value: "⚠️ 金牛的冷凍庫塞爆了，請趕快來拿喔！",
            label: "⚠️ 金牛的冷凍庫塞爆了，請趕快來拿喔！",
          },
          {
            value: "⚠️ 生鮮食品不宜久放，請趕快來拿喔！",
            label: "⚠️ 生鮮食品不宜久放，請趕快來拿喔！",
          },
          {
            value: "⚠️ 農產品請記得趕快過來拿喔！",
            label: "⚠️ 農產品請記得趕快過來拿喔！",
          },
          {
            value: "晚上10點前都可以來拿喔~",
            label: "晚上10點前都可以來拿喔~",
          },
          { value: "⚠️ 明天店休喔！", label: "⚠️ 明天店休喔！" },
        ]}
        onChange={(e) => setMessage(e.target.value)}
      />
      <TextArea
        className="mb-0"
        hiddenLabel
        placeholder="訊息"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        onClick={handleSend}
        disabled={userIds.length === 0}
        loading={sendMessage.isLoading}
        variant="primary"
        fullWidth
        icon={<PaperAirplaneIcon className="rotate-90" />}
      >
        傳送
      </Button>
    </div>
  );
};

export default Messager;
