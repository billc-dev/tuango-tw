import TabButton from "components/Tab/TabButton";
import Order from "domain/Order";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { IPost } from "../post";
import { useUser } from "domain/User/hooks";
import LoginCard from "domain/User/LoginCard";

interface Props {
  post: IPost;
}

const PostActions: FC<Props> = ({ post }) => {
  const { data } = useUser();
  const router = useRouter();
  const [action, setAction] = useState<"order" | "comment">(
    window.location.hash === "#comment" ? "comment" : "order"
  );

  return data?.data.user ? (
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
      <Order post={post} action={action} />
    </>
  ) : (
    <LoginCard />
  );
};

export default PostActions;
