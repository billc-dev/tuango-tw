import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Post } from "types";

interface PostCardProps {
  post: Post;
  pageIndex: number;
  postIndex: number;
}

const PostCard: FC<PostCardProps> = ({ post, pageIndex, postIndex }) => {
  const router = useRouter();

  return (
    <div
      key={post._id}
      className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-md hover:shadow-2xl dark:bg-zinc-800
              dark:hover:shadow-gray-900"
      onClick={() => {
        router.push(
          { pathname: `/posts/${post._id}`, query: { pageIndex, postIndex } },
          undefined,
          {
            shallow: true,
          }
        );
      }}
    >
      <LazyLoadImage
        src={post.imageUrls[0].sm}
        className="h-2/3 max-h-48 object-cover"
      />
      <div className="px-2 pt-2 pb-1">
        <div className="truncate">{post.postNum}</div>
        <div className="truncate">{post.title}</div>
        <div className="truncate text-xs">{post.displayName}</div>
        <div className="flex justify-between pt-2">
          <div className="w-2/5 truncate">
            {post.orderCount ? `${post.orderCount + 100} 訂單` : ""}
          </div>
          <div className="truncate">$100~$5000</div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
