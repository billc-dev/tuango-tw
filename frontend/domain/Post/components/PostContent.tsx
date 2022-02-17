import Header from "components/Card/CardHeader";
import React, { FC } from "react";
import { date, getFullDateFromNow } from "services/date";
import { IPost } from "../types";
import PostImageCarousel from "./PostImageCarousel";

interface Props {
  post: IPost;
}

const PostContent: FC<Props> = (props) => {
  const { post } = props;
  return (
    <>
      <Header
        img={post.pictureUrl}
        title={post.displayName}
        subtitle={getFullDateFromNow(post.createdAt)}
      />
      <PostImageCarousel imageUrls={post.imageUrls} />
      <div className="py-4">
        <p className="font-bold">
          #{post.postNum} {post.title} #{post.displayName}
        </p>
        <p className="pt-4">
          ❤️ #結單日: {post.deadline ? date(post.deadline) : "成團通知"}
        </p>
        <p>
          💚 #到貨日: {post.deliveryDate ? date(post.deliveryDate) : "貨到通知"}
        </p>
        <p className="whitespace-pre-line pt-4">{post.body}</p>
      </div>
    </>
  );
};

export default PostContent;
