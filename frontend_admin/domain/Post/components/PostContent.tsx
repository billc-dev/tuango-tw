import { useRouter } from "next/router";
import React, { FC } from "react";

import { shallowPush } from "utils";

import CardHeader from "components/Card/CardHeader";
import { getFullDate, getFullDateFromNow } from "services/date";

import { getStorageTypeLabel } from "../services";
import { IPost } from "../types";
import PostImageCarousel from "./PostImageCarousel";

interface Props {
  post: IPost;
  feed?: boolean;
}

const PostContent: FC<Props> = (props) => {
  const router = useRouter();
  const { post, feed } = props;
  return (
    <>
      <CardHeader
        img={post.pictureUrl}
        title={post.displayName}
        subtitle={getFullDateFromNow(post.createdAt)}
      />
      <PostImageCarousel imageUrls={post.imageUrls} />
      <div
        className={`py-4 ${feed && "cursor-pointer"}`}
        onClick={() => {
          if (feed) shallowPush(router, { ...router.query, postId: post._id });
        }}
      >
        <p className="font-bold">
          #{post.postNum} {post.title} #{post.displayName}
        </p>
        <p>
          ❤️ #結單日: {post.deadline ? getFullDate(post.deadline) : "成團通知"}
        </p>
        <p>
          💚 #到貨日:{" "}
          {post.deliveryDate ? getFullDate(post.deliveryDate) : "貨到通知"}
        </p>
        <p>儲存方式: {getStorageTypeLabel(post.storageType)}</p>
        <p className={`whitespace-pre-line pt-4 ${feed && "line-clamp-4"}`}>
          {post.body.trim()}
        </p>
      </div>
    </>
  );
};

export default PostContent;
