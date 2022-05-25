import { useRouter } from "next/router";
import React, { FC } from "react";

import { ChatAltIcon, ClipboardListIcon } from "@heroicons/react/outline";

import TabButton from "components/Tab/TabButton";
import TabContainer from "components/Tab/TabContainer";
import LikeButton from "domain/Like/LikeButton";
import { shallowPush } from "utils/routing";

import PostContent from "../components/PostContent";
import { Action, IPost } from "../types";

interface Props {
  post: IPost;
}

const PostFeedCard: FC<Props> = ({ post }) => {
  const router = useRouter();
  const handleClick = (action: Action) => {
    shallowPush(router, { ...router.query, postId: post._id, action });
  };
  return (
    <div className="px-4">
      <PostContent feed {...{ post }} />
      <TabContainer>
        <LikeButton tabButton postId={post._id} likeCount={post.likeCount} />
        <TabButton
          icon={<ChatAltIcon />}
          selected={false}
          onClick={() => handleClick("comment")}
        >
          {post.commentCount} 問與答
        </TabButton>
        <TabButton
          icon={<ClipboardListIcon />}
          selected={false}
          onClick={() => handleClick("order")}
        >
          {post.orderCount} 訂單
        </TabButton>
      </TabContainer>
    </div>
  );
};

export default PostFeedCard;
