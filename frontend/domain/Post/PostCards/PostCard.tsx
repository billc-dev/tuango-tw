import { useRouter } from "next/router";
import React, { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getProductPriceRange } from "../services/price";
import { IPostCard } from "../types";
// import { HeartIcon } from "@heroicons/react/outline";

interface PostCardProps {
  post: IPostCard;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  const router = useRouter();

  const openDialog = () =>
    router.push({ query: { id: post._id } }, undefined, { shallow: true });

  return (
    <div
      className="flex h-[264px] max-w-[180px] transform flex-col overflow-hidden rounded-3xl bg-white
              shadow-md transition hover:shadow-2xl dark:bg-zinc-800 dark:hover:shadow-gray-900"
    >
      <LazyLoadImage
        src={post.imageUrls && post.imageUrls[0].sm}
        alt="product"
        className="h-[180px] w-[180px] object-cover"
        onClick={openDialog}
      />

      <div className="px-2 pt-2 pb-1">
        <div onClick={openDialog}>
          <div className="truncate">{post.title}</div>
          <div className="truncate text-xs">{post.displayName}</div>
          <div className="flex justify-between pt-2">
            <div aria-label="orderCount" className="w-2/5 truncate">
              {post.orderCount ? `${post.orderCount} 訂單` : ""}
            </div>
            <div className="truncate">${getProductPriceRange(post.items)}</div>
          </div>
        </div>
        {/* <button className="mt-2 mb-1 w-full rounded-2xl py-1 outline outline-2 outline-pink-400 hover:bg-pink-200">
          <div className="flex items-center justify-center ">
            <HeartIcon className="h-6 w-6 text-pink-400 hover:fill-pink-400" />
          </div>
        </button> */}
      </div>
    </div>
  );
};

export default PostCard;
