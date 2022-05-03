import { useRouter } from "next/router";
import React, { useState } from "react";

import EditPost from "./EditPost";
import PostTable from "./PostTable";
import { usePosts } from "./hooks";
import { PostQuery } from "./types";

const limit = 20;

const Post = () => {
  const router = useRouter();
  const [query, setQuery] = useState<PostQuery>({ page: 0 });
  const postsQuery = usePosts(limit, query);

  return (
    <>
      <PostTable
        data={postsQuery.data}
        {...{ query, setQuery, limit, loading: postsQuery.isFetching }}
      />
      {typeof router.query.edit_post_id === "string" && (
        <EditPost postId={router.query.edit_post_id} />
      )}
    </>
  );
};

export default Post;
