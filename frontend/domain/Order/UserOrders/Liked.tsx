import React, { useEffect } from "react";

import Container from "components/Container";
import PostCards from "domain/Post/PostCards";
import { useInfiniteLikedPostQuery } from "domain/Post/hooks";

const Liked = () => {
  const limit = 16;
  const postCardsQuery = useInfiniteLikedPostQuery(limit);
  useEffect(() => {
    return () => {
      postCardsQuery.remove();
    };
  }, []);
  return (
    <Container>
      <PostCards postCardsQuery={postCardsQuery} />
    </Container>
  );
};

export default Liked;
