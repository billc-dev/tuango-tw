import React from "react";
import PostCardGrid from "./PostCardGrid";
import PostCardSkeleton from "./PostCardSkeleton";

const PostCardSkeletons = () => {
  return (
    <PostCardGrid>
      {[...Array(4)].map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </PostCardGrid>
  );
};

export default PostCardSkeletons;
