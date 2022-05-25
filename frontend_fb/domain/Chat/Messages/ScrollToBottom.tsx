import React, { FC, useEffect, useRef, useState } from "react";

import { useInView } from "react-intersection-observer";

import {
  useInfiniteMessages,
  useNewMessages,
  useResetRoomNotifications,
  useSetRead,
} from "../hooks";

interface Props {
  roomId: string;
}

const ScrollToBottom: FC<Props> = ({ roomId }) => {
  const [scrolledToBottom, setScrolledToBottom] = useState(false);

  const { isLoading, data } = useInfiniteMessages(roomId);
  const newMessageQuery = useNewMessages(roomId);

  const setRead = useSetRead();
  const resetRoomNotifications = useResetRoomNotifications();

  const ref = useRef<HTMLDivElement>(null);
  const { ref: bottomRef, inView } = useInView();

  useEffect(() => {
    if (scrolledToBottom) return;
    if (isLoading || !data) return;
    ref.current?.scrollIntoView();
    setScrolledToBottom(true);
  }, [isLoading, data]);

  useEffect(() => {
    if (newMessageQuery.data?.data.messages.length) {
      ref.current?.scrollIntoView();
    }
  }, [newMessageQuery.data?.data.messages.length]);

  useEffect(() => {
    if (!inView) return;
    setRead.mutate({ roomId, createdAt: new Date().toISOString() });
    resetRoomNotifications.mutate(roomId);
  }, [inView, isLoading]);
  return (
    <>
      <div ref={ref} />
      <div ref={bottomRef} />
    </>
  );
};

export default ScrollToBottom;
