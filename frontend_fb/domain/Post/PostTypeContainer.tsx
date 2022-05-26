import dynamic from "next/dynamic";
import React, { FC, useEffect, useState } from "react";

import Container from "components/Container";
import ActionArea from "domain/Settings/ActionArea";
import { getViewMode } from "services/setting";

import { PostCardsProps } from "./PostCards";
import { PostFeedProps } from "./PostFeed";
import { useInfinitePostCardQuery, useInfinitePostsQuery } from "./hooks";

const PostCards = dynamic(() => import("./PostCards"), {
  ssr: false,
}) as (props: PostCardsProps) => JSX.Element;
const PostFeed = dynamic(() => import("./PostFeed"), {
  ssr: false,
}) as (props: PostFeedProps) => JSX.Element;

const limit = 20;

interface Props {
  fb: boolean;
}

const PostTypeContainer: FC<Props> = ({ fb }) => {
  const [viewMode, setViewMode] = useState(getViewMode());

  const postCardsQuery = useInfinitePostCardQuery(limit, {
    fb,
    enabled: viewMode === "cards",
  });
  const postsQuery = useInfinitePostsQuery(limit, {
    fb,
    enabled: viewMode === "feed",
  });
  useEffect(() => {
    return () => {
      postCardsQuery.remove();
      postsQuery.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
