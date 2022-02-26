import React from "react";

import Container from "components/Container";
import PostCards from "domain/Post/PostCards";
import { useInfiniteLikedPostQuery } from "domain/Post/hooks";

const Liked = () => {
  const limit = 16;
  const postsQuery = useInfiniteLikedPostQuery(limit);
  return (
    <Container>
      <PostCards postsQuery={postsQuery} />
    </Container>
  );
};

export default Liked;
