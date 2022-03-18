import React, { useEffect } from "react";

import { useRouter } from "next/router";

import PostCards from "domain/Post/PostCards";
import { useInfinitePostCardQuery } from "domain/Post/hooks";

import SearchBar from "./SearchBar";
import { QueryTypes } from "./types";

const Search = () => {
  const router = useRouter();
  const limit = 16;
  const postsQuery = useInfinitePostCardQuery(limit, {
    type: router.query.type as QueryTypes,
    value: router.query.value as string,
  });
  useEffect(() => {
    return () => {
      postsQuery.remove();
    };
  }, []);
  return (
    <div className="p-2">
      <SearchBar />
      <PostCards postsQuery={postsQuery} />
    </div>
  );
};

export default Search;
