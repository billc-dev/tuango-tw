import { useRouter } from "next/router";
import React, { FC } from "react";

import CardHeader from "components/Card/CardHeader";
import MessageButton from "domain/Chat/MessageButton";
import { useUser } from "domain/User/hooks";
import { date, getFullDateFromNow } from "services/date";
import { shallowPush } from "utils/routing";

import EditPostButton from "../EditPost/EditPostButton";
import DeletePostButton from "../PostSellerActions/DeletePostButton";
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
  const userQuery = useUser();
  const isPostCreator = userQuery.data?.data.user.username === post.userId;
  return (
    <>
      <CardHeader
        onClick={() => router.push(`/posts/${post.userId}`)}
        img={post.pictureUrl}
        title={post.displayName}
        subtitle={getFullDateFromNow(post.createdAt)}
        action={
          !feed ? (
            <div className="flex">
              {isPostCreator && <EditPostButton {...{ post }} />}
              {isPostCreator && post.status === "open" && (
                <DeletePostButton postId={post._id} />
              )}
              {!isPostCreator && (
                <MessageButton post={post} username={post.userId} />
              )}
            </div>
          ) : null
        }
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
        <p>❤️ #結單日: {post.deadline ? date(post.deadline) : "成團通知"}</p>
        <p>
          💚 #到貨日: {post.deliveryDate ? date(post.deliveryDate) : "貨到通知"}
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
