import { useRouter } from "next/router";
import React, { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { PostCard } from "types";
import "react-lazy-load-image-component/src/effects/opacity.css";

interface PostCardProps {
  post: PostCard;
  pageIndex: number;
  postIndex: number;
}

const PostCard: FC<PostCardProps> = ({ post, pageIndex, postIndex }) => {
  const router = useRouter();

  return (
    <div
      className="flex max-w-[180px] flex-col overflow-hidden rounded-3xl bg-white shadow-md hover:shadow-2xl
              dark:bg-zinc-800 dark:hover:shadow-gray-900"
      onClick={() => {
        router.push(
          { query: { pageIndex, postIndex, id: post._id } },
          undefined,
          { shallow: true }
        );
      }}
    >
      <LazyLoadImage
        src={post.imageUrls && post.imageUrls[0].sm}
        className="h-[180px] w-[180px] object-cover transition-opacity "
        effect="opacity"
      />

      <div className="px-2 pt-2 pb-1">
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
