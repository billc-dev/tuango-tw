import React, { FC, useEffect } from "react";

import { useInfiniteMessages, useNewMessages } from "../hooks";
import { IRoomUser } from "../types";
import LoadMoreMessage from "./LoadMoreMessage";
import Message from "./Message";
import ScrollToBottom from "./ScrollToBottom";

interface Props {
  roomId: string;
  otherUser: IRoomUser | undefined;
}

const Messages: FC<Props> = ({ roomId, otherUser }) => {
  const { data, remove } = useInfiniteMessages(roomId);
  const newMessageQuery = useNewMessages(roomId);
  useEffect(() => {
    return () => {
      remove();
      newMessageQuery.remove();
    };
  }, []);
  return (
    <div>
      <LoadMoreMessage roomId={roomId} />
      {data?.pages.map((page, pageIndex) =>
        page.data.messages.map((message, msgIndex) => {
          const getPrevMsg = () => {
            if (pageIndex > 0 && msgIndex === 0) {
              return data.pages[pageIndex - 1].data.messages.slice(-1)[0];
            }
            if (msgIndex > 0) {
              return data.pages[pageIndex].data.messages[msgIndex - 1];
            }
            if (pageIndex === 0 && msgIndex === 0) return undefined;
            return page.data.messages.slice(-1)[0];
          };
          return (
            <Message
              key={message._id}
              message={message}
              prevMsg={getPrevMsg()}
              otherUser={otherUser}
            />
          );
        })
      )}
      {newMessageQuery.data?.data.messages.map((message, index) => {
        const prevMsg =
          index === 0
            ? data?.pages.slice(-1)[0].data.messages.slice(-1)[0]
            : newMessageQuery.data.data.messages[index - 1];
        return (
          <Message
            key={message._id}
            message={message}
            prevMsg={prevMsg}
            otherUser={otherUser}
          />
        );
      })}
      <ScrollToBottom roomId={roomId} />
    </div>
  );
};

export default Messages;
