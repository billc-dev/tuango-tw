import { useRouter } from "next/router";
import React, { FC } from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";

import Card from "components/Card";
import { getTime } from "services/date";
import { shallowPush } from "utils/routing";

import { IMessage } from "../types";

interface Props {
  message: IMessage;
  isUserMessage: boolean;
}

const PostMessage: FC<Props> = ({ message, isUserMessage }) => {
  const router = useRouter();
  const { post } = message;
  if (!post || typeof post === "string") return null;
  return (
    <div className={`-my-1 ${isUserMessage && "order-last"}`}>
      <Card
        className="shadow mx-2 my-3 cursor-pointer hover:shadow-lg transition-shadow bg-white ring-1 ring-zinc-200 dark:ring-0"
        onClick={() =>
          shallowPush(router, { ...router.query, postId: post._id })
        }
      >
        <div className="grid grid-cols-4">
          <div className="my-auto item col-span-1">
            <LazyLoadImage
              className="h-full w-full object-cover"
              src={post.imageUrls[0].sm}
            />
          </div>
          <div className="p-2 col-span-3">
            <p className="text-sm">
              #{post.postNum} {post.title} #{post.displayName}
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {getTime(post.createdAt)}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PostMessage;
