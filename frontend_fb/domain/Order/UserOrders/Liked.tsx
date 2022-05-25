import React, { useEffect } from "react";

import Container from "components/Container";
import PostCards from "domain/Post/PostCards";
import { useInfiniteLikedPostQuery } from "domain/Post/hooks";

const limit = 20;

const Liked = () => {
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
