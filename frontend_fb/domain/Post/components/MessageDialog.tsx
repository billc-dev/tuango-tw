import React, { FC, useState } from "react";

import { PaperAirplaneIcon } from "@heroicons/react/outline";
import toast from "react-hot-toast";

import Button from "components/Button";
import Dialog from "components/Dialog";
import TabButton from "components/Tab/TabButton";
import TabContainer from "components/Tab/TabContainer";
import TextArea from "components/TextField/TextArea";
import { useCreateComment } from "domain/Comment/hooks";
import { useOrders } from "domain/Order/hooks";

import { useSendMessage } from "../hooks";
import { IPost } from "../types";
import OrderRow from "./OrderRow";

interface Props {
  open: boolean;
  handleClose: () => void;
  post: IPost;
}

type ITarget = "all" | "specific";

const MessageDialog: FC<Props> = ({ open, handleClose, post }) => {
  const orderQuery = useOrders(post._id);
  const sendMessage = useSendMessage();
  const createComment = useCreateComment();
  const [target, setTarget] = useState<ITarget>("all");
  const [userIds, setUserIds] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  const getUserIds = (target: ITarget) => {
    if (target === "all") {
      const userIds = orderQuery.data?.orders.map((order) => order.userId);
      if (!userIds) return;
      const uniqueUserIds = userIds.filter((v, i, a) => a.indexOf(v) === i);
      return uniqueUserIds;
    }
    return userIds;
  };

  const handleSend = (message: string) => {
    if (!message) return;
    const userIds = getUserIds(target);
    if (!userIds) return;

    toast.loading("訊息傳送中...", { id: "sendMessage" });
    sendMessage.mutate(
      { message, userIds, postId: post._id },
      {
        onSuccess: () => {
          toast.success("訊息已傳送", { id: "sendMessage" });
          setMessage("");
        },
        onError: () => {
          toast.error("訊息傳送失敗", { id: "sendMessage" });
        },
      }
    );

    if (target !== "all") return;
    createComment.mutate({
      commentForm: { comment: message, postId: post._id },
    });
  };

  const isDisabled = () => {
    if (!message) return true;
    if (target === "specific") {
      if (userIds.length === 0) return true;
    }
    return false;
  };

  return (
    <Dialog open={open} title="傳送訊息" handleClose={handleClose}>
      <TabContainer className="my-2">
        <TabButton selected={target === "all"} onClick={() => setTarget("all")}>
          所有買家
        </TabButton>
        <TabButton
          selected={target === "specific"}
          onClick={() => setTarget("specific")}
        >
          特定買家
        </TabButton>
      </TabContainer>
      {target === "specific" && (
        <div>
          <table className="table-auto w-full my-3">
            <thead>
              <tr className="whitespace-nowrap text-left border-b-2">
                <th className=""></th>
                <th className="font-normal">序號</th>
                <th className="font-normal">稱呼</th>
                <th className="font-normal">訂單</th>
              </tr>
            </thead>
            <tbody>
              {orderQuery.data?.orders.map((order) => (
                <OrderRow key={order._id} {...{ order, userIds, setUserIds }} />
              ))}
            </tbody>
          </table>
        </div>
      )}
      <TextArea
        hiddenLabel
        placeholder="訊息"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        fullWidth
        disabled={isDisabled()}
        size="lg"
        icon={<PaperAirplaneIcon className="rotate-90" />}
        onClick={() => handleSend(message)}
      >
        傳送
      </Button>
    </Dialog>
  );
};

export default MessageDialog;
