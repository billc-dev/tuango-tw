import React, { FC, useState } from "react";

import { useRouter } from "next/router";

import TabButton from "components/Tab/TabButton";
import Comment from "domain/Comment";
import Order from "domain/Order";
import LoginCard from "domain/User/LoginCard";
import { useUser } from "domain/User/hooks";

import { Action, IPost } from "../types";

interface Props {
  post: IPost;
}

const PostActions: FC<Props> = ({ post }) => {
  const { data } = useUser();
  const router = useRouter();
  const action = router.query.action as Action;
  return data?.data.user ? (
    <>
      <div className="flex select-none space-x-1 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800">
        <TabButton selected={false}>{post.likeCount} 喜歡</TabButton>
        <TabButton
          selected={action === "comment"}
          onClick={() => {
            router.push(
              { query: { ...router.query, action: "comment" } },
              undefined,
              {
                shallow: true,
              }
            );
          }}
        >
          {post.commentCount} 問與答
        </TabButton>
        <TabButton
          selected={action === "order" || action === undefined}
          onClick={() => {
            router.push(
              { query: { ...router.query, action: "order" } },
              undefined,
              {
                shallow: true,
              }
            );
          }}
        >
          {post.orderCount} 訂單
        </TabButton>
      </div>
      <Order post={post} action={action} />
      <Comment postId={post._id} action={action} />
    </>
  ) : (
    <LoginCard />
  );
};

export default PostActions;
