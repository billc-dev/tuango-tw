import React, { useEffect } from "react";

import { useRouter } from "next/router";
import toast from "react-hot-toast";

import PostCards from "domain/Post/PostCards";
import { useInfinitePostQuery } from "domain/Post/hooks";

import SearchBar from "./SearchBar";
import { QueryTypes } from "./types";

const Search = () => {
  const router = useRouter();
  const limit = 16;
  const postsQuery = useInfinitePostQuery(limit, {
    type: router.query.type as QueryTypes,
    value: router.query.value as string,
  });
  useEffect(() => {
    if (postsQuery.isLoading) toast.loading("貼文搜尋中...", { id: "search" });
  }, [postsQuery.isLoading]);
  return (
    <div className="p-2">
      <SearchBar />
      <PostCards postsQuery={postsQuery} />
    </div>
  );
};

export default Search;
