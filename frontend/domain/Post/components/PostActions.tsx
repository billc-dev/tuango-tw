import { useRouter } from "next/router";
import React, { FC } from "react";

import { LinkIcon } from "@heroicons/react/outline";
import toast from "react-hot-toast";

import Button from "components/Button";
import TabButton from "components/Tab/TabButton";
import TabContainer from "components/Tab/TabContainer";
import Comment from "domain/Comment";
import LikeButton from "domain/Like/LikeButton";
import Order from "domain/Order";
import LoginCard from "domain/User/LoginCard";
import { useUser } from "domain/User/hooks";

import ClosePostButton from "../PostSellerActions/ClosePostButton";
import { getPostUrl, setAction } from "../services";
import { Action, IPost } from "../types";
import PostShareButton from "./PostShareButton";

interface Props {
  post: IPost;
}

const PostActions: FC<Props> = ({ post }) => {
  const { data } = useUser();
  const router = useRouter();
  const { postNum, title, displayName } = post;
  const action = router.query.action as Action;
  return data?.data.user ? (
    <>
      <Button
        icon={<LinkIcon />}
        fullWidth
        variant="primary"
        className="mb-2"
        onClick={() => {
          navigator.clipboard.writeText(
            `🤗#${postNum} ${title} ~${displayName}\n貼文連結: ${getPostUrl(
              post._id
            )}`
          );
          toast.success("已複製貼文連結！");
        }}
      >
        複製分享連結
      </Button>
      <PostShareButton post={post} />
      <TabContainer>
        <LikeButton tabButton postId={post._id} likeCount={post.likeCount} />
        <TabButton
          selected={action === "comment"}
          onClick={() => setAction("comment", router)}
        >
          {post.commentCount} 問與答
        </TabButton>
        <TabButton
          selected={action === "order" || !action}
          onClick={() => setAction("order", router)}
        >
          {post.orderCount} 訂單
        </TabButton>
      </TabContainer>
      {data.data.user.username === post.userId && (
        <ClosePostButton postId={post._id} status={post.status} />
      )}
      <Order post={post} action={action} />
      <Comment postId={post._id} action={action} />
    </>
  ) : (
    <LoginCard />
  );
};

export default PostActions;
