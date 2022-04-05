import { useRouter } from "next/router";
import { FC, useEffect, useRef } from "react";

import CardAvatar from "components/Card/CardAvatar";
import { useUser } from "domain/User/hooks";
import { getMessageDate } from "services/date";

import { IMessage, IRoomUser } from "../types";
import ImageMessage from "./ImageMessage";
import OrderMessage from "./OrderMessage";
import PostMessage from "./PostMessage";
import TextMessage from "./TextMessage";

interface Props {
  message: IMessage;
  prevMsg?: IMessage;
  otherUser: IRoomUser | undefined;
}

const Message: FC<Props> = ({ message, prevMsg, otherUser }) => {
  const router = useRouter();
  const userQuery = useUser();
  const userId = userQuery.data?.data.user._id;
  const isUserMessage = userId === message.userId;
  const ref = useRef<HTMLDivElement>(null);

  const getComponent = () => {
    switch (message.type) {
      case "text":
        return <TextMessage {...{ message, isUserMessage }} />;
      case "imageUrl":
        return <ImageMessage {...{ message, isUserMessage }} />;
      case "order":
        return <OrderMessage {...{ message, isUserMessage }} />;
      case "post":
        return <PostMessage {...{ message, isUserMessage }} />;
      default:
        return null;
    }
  };
  const getIsRead = () => {
    return message.read.find((msg) => msg.userId !== userId)?.read;
  };

  useEffect(() => {
    if (!router.query.firstMessageId) return;
    if (message._id === router.query.firstMessageId)
      ref.current?.scrollIntoView();
  }, [router.query.firstMessageId]);
  return (
    <div ref={ref} className={`flex ${isUserMessage && "justify-end"}`}>
      <div>
        {!isUserMessage && prevMsg?.userId !== message.userId && (
          <CardAvatar
            img={
              (typeof otherUser?.user !== "string" &&
                otherUser?.user.pictureUrl) ||
              ""
            }
            alt={
              (typeof otherUser?.user !== "string" &&
                otherUser?.user.displayName) ||
              ""
            }
          />
          // <img src={profileImg} className="h-10 w-10 rounded-full" />
        )}
        <div className="flex items-end">
          {getComponent()}
          <div>
            <p className="text-right text-xs dark:text-zinc-200">
              {isUserMessage && getIsRead() && "已讀"}
            </p>
            <p className="mb-0.5 text-sm dark:text-zinc-200">
              {getMessageDate(message.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
