import { useRouter } from "next/router";
import React, { useState } from "react";

import InfiniteScroll from "react-infinite-scroll-component";

import { IUser } from "api/auth/userDB";
import Dialog from "components/Dialog";
import TabButton from "components/Tab/TabButton";
import TabContainer from "components/Tab/TabContainer";
import { useInfinitePostCardQuery } from "domain/Post/hooks";
import { useUser } from "domain/User/hooks";
import { shallowPush } from "utils/routing";

import { useRoom } from "../hooks";
import SendPostCard from "./SendPostCard";

const limit = 20;

const SendPost = () => {
  const router = useRouter();
  const userQuery = useUser();
  const [status, setStatus] = useState<"user" | "seller">("seller");
  const roomQuery = useRoom(router.query.chatId as string);
  const otherUser = roomQuery.data?.data.room.users?.find((u) => {
    if (typeof u.user === "string") return false;
    return u.user._id !== userQuery.data?.data.user._id;
  });
  const getValue = () => {
    if (status === "seller") return (otherUser?.user as IUser).username;
    return userQuery.data?.data.user.username as string;
  };
  const { data, fetchNextPage, hasNextPage } = useInfinitePostCardQuery(limit, {
    query: { type: "userId", value: getValue() },
  });
  const handleClose = () => {
    const { send_post, ...query } = router.query;
    shallowPush(router, query);
  };
  return (
    <Dialog title="傳送貼文" open handleClose={handleClose}>
      <TabContainer className="mt-2">
        <TabButton
          selected={status === "seller"}
          onClick={() => setStatus("seller")}
        >
          賣家貼文
        </TabButton>
        {userQuery.data?.data.user.role !== "basic" && (
          <TabButton
            selected={status === "user"}
            onClick={() => setStatus("user")}
          >
            我的貼文
          </TabButton>
        )}
      </TabContainer>
      <InfiniteScroll
        className="pb-4"
        loader={<></>}
        next={() => fetchNextPage()}
        hasMore={hasNextPage ?? false}
        dataLength={
          data?.pages.reduce((sum, post) => post.posts.length + sum, 0) || 0
        }
      >
        {data?.pages.map((page) =>
          page.posts.map((post) => <SendPostCard key={post._id} post={post} />)
        )}
      </InfiniteScroll>
    </Dialog>
  );
};

export default SendPost;
