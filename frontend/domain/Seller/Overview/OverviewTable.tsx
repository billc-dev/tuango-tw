import React, { FC } from "react";

import InfiniteScroll from "react-infinite-scroll-component";

import Button from "components/Button";
import { useInfiniteSellerPosts } from "domain/Post/hooks";
import { SellerQuery } from "domain/Post/types";

import OverviewRow from "./OverviewRow";
import TableRowSkeleton from "./TableRowSkeleton";

interface Props {
  query: SellerQuery;
}

const OverviewTable: FC<Props> = ({ query }) => {
  const limit = 16;
  const { data, fetchNextPage, isFetching, isLoading, hasNextPage } =
    useInfiniteSellerPosts(limit, { query });
  return (
    <InfiniteScroll
      className="px-2 max-w-md m-auto"
      loader={isFetching && <></>}
      next={() => fetchNextPage()}
      hasMore={hasNextPage ?? false}
      dataLength={
        data?.pages.reduce((sum, post) => post.posts.length + sum, 0) || 0
      }
    >
      <table className="table-auto w-full">
        <thead>
          <tr className="whitespace-nowrap text-left border-b-2">
            <th className="font-normal">流水編號</th>
            <th className="font-normal p-2">團購主題</th>
            <th className="font-normal text-center">人數</th>
            <th className="font-normal text-center">查看</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading
            ? data?.pages.map((page) =>
                page.posts.map((post) => (
                  <OverviewRow key={post._id} post={post} />
                ))
              )
            : [...Array(16)].map((_, i) => <TableRowSkeleton key={i} />)}
          {isFetching &&
            [...Array(8)].map((_, i) => <TableRowSkeleton key={i} />)}
        </tbody>
      </table>
      {data?.pages[data.pages.length - 1].nextId && (
        <Button className="m-auto my-2" onClick={() => fetchNextPage()}>
          載入更多貼文
        </Button>
      )}
    </InfiniteScroll>
  );
};

export default OverviewTable;
