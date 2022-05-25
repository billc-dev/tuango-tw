import { useRouter } from "next/router";
import React, { FC, useState } from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";

import LikeButton from "domain/Like/LikeButton";
import { shallowPush } from "utils/routing";

import { getProductPriceRange } from "../services";
import { IPostCard } from "../types";

interface PostCardProps {
  post: IPostCard;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  const openDialog = () =>
    shallowPush(router, { ...router.query, postId: post._id });

  return (
    <div
      className="hover:scale-[1.01] antialiased flex max-w-[180px] transform flex-col overflow-hidden rounded-3xl bg-white
              shadow-md transition hover:shadow-2xl dark:bg-zinc-800 dark:hover:shadow-gray-900"
    >
      <div className="h-[180px] w-[180px] cursor-pointer">
        <LazyLoadImage
          alt="product"
          src={post.imageUrls && post.imageUrls[0].sm}
          onLoad={() => setLoaded(true)}
          className={`h-[180px] w-[180px] object-cover transition-all duration-300 ${
            loaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"
          }`}
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
              {`$${getProductPriceRange(post.items)}`}
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
