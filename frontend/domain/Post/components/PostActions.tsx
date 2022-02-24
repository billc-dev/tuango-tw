import React, { FC } from "react";

import { useRouter } from "next/router";

import TabButton from "components/Tab/TabButton";
import TabContainer from "components/Tab/TabContainer";
import Comment from "domain/Comment";
import LikeButton from "domain/Like/LikeButton";
import Order from "domain/Order";
import LoginCard from "domain/User/LoginCard";
import { useUser } from "domain/User/hooks";

import { setAction } from "../services/route";
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
      <TabContainer>
        <LikeButton tabButton postId={post._id} likeCount={post.likeCount} />
        <TabButton
          selected={action === "comment"}
          onClick={() => setAction("comment", router)}
        >
          {post.commentCount} 問與答
        </TabButton>
        <TabButton
          selected={action === "order" || action === undefined}
          onClick={() => setAction("order", router)}
        >
          {post.orderCount} 訂單
        </TabButton>
      </TabContainer>
      <Order post={post} action={action} />
      <Comment postId={post._id} action={action} />
    </>
  ) : (
    <LoginCard />
  );
};

export default PostActions;
