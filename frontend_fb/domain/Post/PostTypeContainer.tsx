import dynamic from "next/dynamic";
import { FC, useEffect, useState } from "react";

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
  seller_id?: string;
}

const PostTypeContainer: FC<Props> = ({ fb, seller_id }) => {
  const [viewMode, setViewMode] = useState(getViewMode());

  const postCardsQuery = useInfinitePostCardQuery(limit, {
    fb,
    enabled: viewMode === "cards",
    ...(seller_id && {
      query: { type: "userId", value: seller_id },
    }),
  });
  const postsQuery = useInfinitePostsQuery(limit, {
    fb,
    enabled: viewMode === "feed",
    ...(seller_id && {
      query: { type: "userId", value: seller_id },
    }),
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
