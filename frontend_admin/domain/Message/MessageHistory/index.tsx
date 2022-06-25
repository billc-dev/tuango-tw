import React, { useEffect } from "react";

import InfiniteScroll from "react-infinite-scroll-component";

import LoadingIndicator from "components/Indicator/LoadingIndicator";
import { getOrderStatusLabel } from "domain/Order/services";
import { getStorageType } from "domain/Post/services";
import { getFullDateFromNow } from "services/date";

import { useInfiniteMessageQuery } from "../hooks";

const limit = 10;

const MessageHistory = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, remove } =
    useInfiniteMessageQuery(limit);
  useEffect(() => {
    return () => remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      id="message-history"
      className="col-span-full order-last md:order-none md:col-span-1 mt-2 md:h-[90vh] md:overflow-y-auto"
    >
      <InfiniteScroll
        scrollableTarget="message-history"
        className="pb-4"
        loader={<></>}
        next={() => fetchNextPage()}
        hasMore={hasNextPage ?? false}
        dataLength={
          data?.pages.reduce((sum, page) => page.messages.length + sum, 0) || 0
        }
      >
        <p className="text-2xl">訊息紀錄</p>
        {data?.pages.map((page) =>
          page.messages.map((message) => (
            <div key={message._id} className="border-b-2  py-2">
              <p>{getFullDateFromNow(message.createdAt)}</p>
              {message.query && (
                <>
                  {message.query.postNum && (
                    <p>
                      #{message.query.postNum} {message.query.title} #
                      {message.query.displayName}
                    </p>
                  )}
                  {message.query.status && (
                    <p>狀態: {getOrderStatusLabel(message.query.status)}</p>
                  )}
                  {message.query.storageType && (
                    <p>儲存方式: {getStorageType(message.query.storageType)}</p>
                  )}
                </>
              )}
              <p>訊息:</p>
              <p>{message.message}</p>
              <p>用戶:</p>
              {message.sentTo.map((user, index) => (
                <p key={index} className="text-sm">
                  {user.displayName}
                </p>
              ))}
            </div>
          ))
        )}
        <LoadingIndicator loading={isLoading} />
      </InfiniteScroll>
    </div>
  );
};

export default MessageHistory;
