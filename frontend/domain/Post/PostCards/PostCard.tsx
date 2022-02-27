import React, { FC } from "react";

import { useRouter } from "next/router";
import { LazyLoadImage } from "react-lazy-load-image-component";

import LikeButton from "domain/Like/LikeButton";

import { getProductPriceRange } from "../services";
import { IPostCard } from "../types";

interface PostCardProps {
  post: IPostCard;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  const router = useRouter();

  const openDialog = () =>
    router.push({ query: { ...router.query, postId: post._id } }, undefined, {
      shallow: true,
    });

  return (
    <div
      className="flex max-w-[180px] transform flex-col overflow-hidden rounded-3xl bg-white
              shadow-md transition hover:shadow-2xl dark:bg-zinc-800 dark:hover:shadow-gray-900"
    >
      <div className="h-[180px] w-[180px] cursor-pointer">
        <LazyLoadImage
          src={post.imageUrls && post.imageUrls[0].sm}
          alt="product"
          className="h-[180px] w-[180px] object-cover"
          onClick={openDialog}
        />
      </div>
      <div className="px-2 pt-2 pb-1">
        <div className="cursor-pointer" onClick={openDialog}>
          <div className="truncate">{post.title}</div>
          <div className="flex justify-between items-center">
            <div className="truncate text-xs max-w-[50%]">
              {post.displayName}
            </div>
            <div className="truncate w-auto">
              ${getProductPriceRange(post.items)}
            </div>
          </div>
        </div>
        <div className="flex justify-between py-1">
          <LikeButton postId={post._id} />
          <div
            aria-label="orderCount"
            className="truncate cursor-pointer"
            onClick={openDialog}
          >
            {post.orderCount ? `${post.orderCount} 訂單` : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
