import { useRouter } from "next/router";
import React, { useEffect } from "react";

import PostCards from "domain/Post/PostCards";
import { useInfinitePostCardQuery } from "domain/Post/hooks";

import SearchBar from "./SearchBar";
import { QueryTypes } from "./types";

const limit = 16;

const Search = () => {
  const router = useRouter();
  const postCardsQuery = useInfinitePostCardQuery(limit, {
    query: {
      type: router.query.type as QueryTypes,
      value: router.query.value as string,
    },
  });
  useEffect(() => {
    return () => {
      postCardsQuery.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="p-2 m-auto">
      <SearchBar />
      <PostCards postCardsQuery={postCardsQuery} />
    </div>
  );
};

export default Search;
