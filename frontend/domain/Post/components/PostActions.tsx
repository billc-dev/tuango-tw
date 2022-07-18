import { useRouter } from "next/router";
import React, { FC } from "react";

import { ChatAltIcon, ClipboardListIcon } from "@heroicons/react/outline";

import Button from "components/Button";
import TabButton from "components/Tab/TabButton";
import TabContainer from "components/Tab/TabContainer";
import Comment from "domain/Comment";
import LikeButton from "domain/Like/LikeButton";
import Order from "domain/Order";
import LoginCard from "domain/User/LoginCard";
import { useIsSeller, useUser } from "domain/User/hooks";

import ClosePostButton from "../PostSellerActions/ClosePostButton";
import { setAction } from "../services";
import { Action, IPost } from "../types";
import CopyPostLinkButton from "./CopyPostLinkButton";
import MessageBuyerButton from "./MessageBuyerButton";
import PostShareButton from "./PostShareButton";

interface Props {
  post: IPost;
}

const PostActions: FC<Props> = ({ post }) => {
  const { data } = useUser();
  const router = useRouter();
  const action = router.query.action as Action;
  const isSeller = useIsSeller();
  const isPostCreator = post.userId === data?.data.user.username;
  const isOpen = post.status === "open";
  return data?.data.user ? (
    <>
      {isSeller && (
        <>
          <CopyPostLinkButton {...{ post }} />
          <PostShareButton post={post} />
        </>
      )}
      {!isOpen && (
        <Button fullWidth variant="info" className="mb-2">
          貼文狀態：已結單
        </Button>
      )}
      <TabContainer>
        <LikeButton tabButton postId={post._id} likeCount={post.likeCount} />
        <TabButton
          icon={<ChatAltIcon />}
          selected={action === "comment"}
          onClick={() => setAction("comment", router)}
        >
          {post.commentCount} 問與答
        </TabButton>
        <TabButton
          icon={<ClipboardListIcon />}
          selected={action === "order" || !action}
          onClick={() => setAction("order", router)}
        >
          {post.status !== "completed" && post.orderCount} 訂單
        </TabButton>
      </TabContainer>
      {isPostCreator && (
        <>
          <ClosePostButton postId={post._id} status={post.status} />
          <MessageBuyerButton {...{ post }} />
        </>
      )}
      {post.status !== "completed" && <Order post={post} action={action} />}
      <Comment postId={post._id} action={action} />
    </>
  ) : (
    <LoginCard />
  );
};

export default PostActions;
