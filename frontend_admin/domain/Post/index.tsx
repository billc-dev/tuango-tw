import { useRouter } from "next/router";
import React from "react";

import CreatePost from "./CreatePost";
import EditPost from "./EditPost";
import PostTable from "./PostTable";

const Post = () => {
  const router = useRouter();
  return (
    <>
      <PostTable />
      {typeof router.query.createPost === "string" && <CreatePost />}
      {typeof router.query.edit_post_id === "string" && (
        <EditPost postId={router.query.edit_post_id} />
      )}
    </>
  );
};

export default Post;
