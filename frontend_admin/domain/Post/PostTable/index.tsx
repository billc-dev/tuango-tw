import React, { FC } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

import IconButton from "components/Button/IconButton";
import Table from "components/Table/Table";
import TableBody from "components/Table/TableBody";
import TableHead from "components/Table/TableHead";

import CreatePostButton from "../CreatePost/CreatePostButton";
import { IPost, PostQuery } from "../types";
import PostHead from "./PostHead";
import PostQueryRow from "./PostQueryRow";
import PostRow from "./PostRow";

interface Props {
  query: PostQuery;
  setQuery: React.Dispatch<React.SetStateAction<PostQuery>>;
  limit: number;
  loading: boolean;
  data?: {
    posts: IPost[];
    hasNextPage: boolean;
    length: number;
  };
}

const PostTable: FC<Props> = ({ data, query, setQuery, limit, loading }) => {
  const { page } = query;

  return (
    <>
      <CreatePostButton />
      <div className="flex justify-end items-center mt-2">
        <div>
          {page * limit + 1} -{" "}
          {data?.posts.length && data.posts.length + page * limit} 之{" "}
          {data?.length}
        </div>
        <IconButton
          disabled={page <= 0}
          onClick={() => {
            setQuery((query) => ({ ...query, page: query.page - 1 }));
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          loading={loading}
          disabled={!data?.hasNextPage}
          onClick={() => {
            setQuery((query) => ({ ...query, page: query.page + 1 }));
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </div>
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
      <div className="flex justify-end items-center mt-2">
        <div>
          {page * limit + 1} -{" "}
          {data?.posts.length && data.posts.length + page * limit} 之{" "}
          {data?.length}
        </div>
        <IconButton
          disabled={page <= 0}
          onClick={() => {
            setQuery((query) => ({ ...query, page: query.page - 1 }));
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          loading={loading}
          disabled={!data?.hasNextPage}
          onClick={() => {
            setQuery((query) => ({ ...query, page: query.page + 1 }));
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </div>
    </>
  );
};

export default PostTable;
