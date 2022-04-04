import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";

import { useInView } from "react-intersection-observer";

import { shallowPush } from "utils/routing";

import { useInfiniteMessages } from "../hooks";

interface Props {
  roomId: string;
}

const LoadMoreMessage: FC<Props> = ({ roomId }) => {
  const router = useRouter();
  const { fetchPreviousPage, isLoading, data } = useInfiniteMessages(roomId);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (isLoading || !inView) return;
    fetchPreviousPage();
    shallowPush(router, {
      ...router.query,
      firstMessageId: data?.pages[0].data.messages[0]._id,
    });
  }, [inView]);
  return <div ref={ref} />;
};

export default LoadMoreMessage;
