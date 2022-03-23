import React, { FC } from "react";

import { HeartIcon } from "@heroicons/react/outline";

import TabButton from "components/Tab/TabButton";
import AnimatedSpinner from "components/svg/AnimatedSpinner";

import { useLikePost, useLiked, useUnlikePost } from "./hooks";

interface Props {
  postId: string;
  likeCount?: number;
  tabButton?: boolean;
}

const LikeButton: FC<Props> = ({ postId, tabButton, likeCount }) => {
  const { liked } = useLiked(postId);
  const likePost = useLikePost();
  const unlikePost = useUnlikePost();
  const isLoading = likePost.isLoading || unlikePost.isLoading;

  function handleLike() {
    if (!liked) return likePost.mutate(postId);
    return unlikePost.mutate(postId);
  }
  return tabButton ? (
    <TabButton
      disabled={isLoading}
      selected={false}
      onClick={() => handleLike()}
    >
      <div className="mr-1">
        {!isLoading ? (
          <HeartIcon
            className={`h-5 w-5 stroke-red-600 ${liked && "fill-red-600"}`}
          />
        ) : (
          <AnimatedSpinner size="small" />
        )}
      </div>
      {likeCount} 喜歡
    </TabButton>
  ) : (
    <button type="button" onClick={() => handleLike()} disabled={isLoading}>
      {!isLoading ? (
        <HeartIcon
          className={`h-6 w-6 stroke-red-600 ${liked && "fill-red-600"}`}
        />
      ) : (
        <AnimatedSpinner />
      )}
    </button>
  );
};

export default LikeButton;
