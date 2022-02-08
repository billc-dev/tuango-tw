import React from "react";
import Button from "components/Button";
import router from "next/router";
import PostCards from "./PostCards";

const Post = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-zinc-100 dark:bg-zinc-900">
      <div>
        <Button onClick={() => router.push("/login")}>Login</Button>
        <Button onClick={() => router.push("/")}>Index</Button>
      </div>
      <PostCards />
    </div>
  );
};

export default Post;
