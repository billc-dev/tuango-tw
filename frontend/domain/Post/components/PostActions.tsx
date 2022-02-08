import TabButton from "components/Tab/TabButton";
import Orders from "domain/Order";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { IPost } from "../post";

interface Props {
  post: IPost;
}

const PostActions: FC<Props> = ({ post }) => {
  const router = useRouter();
  const [action, setAction] = useState("order");

  return (
    <>
      <div className="flex select-none space-x-1 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800">
        <TabButton selected={false}>{post.likeCount} 喜歡</TabButton>
        <TabButton
          selected={action === "comment"}
          onClick={() => {
            setAction("comment");
            router.push({ hash: "comment" }, undefined, { shallow: true });
          }}
        >
          {post.commentCount} 問與答
        </TabButton>
        <TabButton
          selected={action === "order"}
          onClick={() => {
            setAction("order");
            router.push({ hash: "order" }, undefined, { shallow: true });
          }}
        >
          {post.orderCount} 訂單
        </TabButton>
      </div>
      {action === "order" && <Orders postId={post._id} items={post.items} />}
    </>
  );
};

export default PostActions;
