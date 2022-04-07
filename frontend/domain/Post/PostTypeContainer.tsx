import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

import Container from "components/Container";
import ActionArea from "domain/Settings/ActionArea";
import { getViewMode } from "services/setting";

import { useInfinitePostCardQuery, useInfinitePostsQuery } from "./hooks";

const PostCards = dynamic(() => import("./PostCards"), {
  ssr: false,
});
const PostFeed = dynamic(() => import("./PostFeed"), { ssr: false });

const limit = 20;

const PostTypeContainer = () => {
  const [viewMode, setViewMode] = useState(getViewMode());

  const postCardsQuery = useInfinitePostCardQuery(limit, {
    enabled: viewMode === "cards",
  });
  const postsQuery = useInfinitePostsQuery(limit, {
    enabled: viewMode === "feed",
  });
  useEffect(() => {
    return () => {
      postCardsQuery.remove();
      postsQuery.remove();
    };
  }, []);
  return (
    <Container>
      <ActionArea {...{ viewMode, setViewMode }} />
      {viewMode === "cards" && <PostCards postCardsQuery={postCardsQuery} />}
      {viewMode === "feed" && <PostFeed postsQuery={postsQuery} />}
    </Container>
  );
};

export default PostTypeContainer;
