import React, { useEffect } from "react";

import Container from "components/Container";
import PostCards from "domain/Post/PostCards";
import { useInfiniteLikedPostQuery } from "domain/Post/hooks";

const Liked = () => {
  const limit = 16;
  const postsQuery = useInfiniteLikedPostQuery(limit);
  useEffect(() => {
    return () => {
      postsQuery.remove();
    };
  }, []);
  return (
    <Container>
      <PostCards postsQuery={postsQuery} />
    </Container>
  );
};

export default Liked;
