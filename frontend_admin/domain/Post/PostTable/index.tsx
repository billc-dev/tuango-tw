import React, { useState } from "react";

import Table from "components/Table/Table";
import TableBody from "components/Table/TableBody";
import TableHead from "components/Table/TableHead";
import TablePagination from "components/Table/TablePagination";

import CreatePostButton from "../CreatePost/CreatePostButton";
import { usePosts } from "../hooks";
import { PostQuery } from "../types";
import PostHead from "./PostHead";
import PostQueryRow from "./PostQueryRow";
import PostRow from "./PostRow";

const limit = 20;

const PostTable = () => {
  const [query, setQuery] = useState<PostQuery>({ page: 0 });
  const { data, isFetching } = usePosts(limit, query);
  const { page } = query;
  const handlePage = (page: number) => {
    return () => {
      setQuery((query) => ({ ...query, page: query.page + page }));
    };
  };
  const handleSetPage = (page: number) => {
    setQuery((query) => ({ ...query, page }));
  };
  return (
    <>
      <CreatePostButton />
      <TablePagination
        {...{
          page,
          limit,
          isLoading: isFetching,
          length: data?.length || 0,
          hasNextPage: !!data?.hasNextPage,
          onSetPage: handleSetPage,
        }}
        onPreviousPage={handlePage(-1)}
        onNextPage={handlePage(1)}
      />
      <div className="overflow-y-auto">
        <Table>
          <TableHead>
            <PostHead />
            <PostQueryRow {...{ setQuery }} />
          </TableHead>
          <TableBody>
            {data?.posts &&
              data?.posts.map((post) => (
                <PostRow key={post._id} {...{ post }} />
              ))}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        {...{
          page,
          limit,
          isLoading: isFetching,
          length: data?.length || 0,
          hasNextPage: !!data?.hasNextPage,
          onSetPage: handleSetPage,
        }}
        onPreviousPage={handlePage(-1)}
        onNextPage={handlePage(1)}
      />
    </>
  );
};

export default PostTable;
