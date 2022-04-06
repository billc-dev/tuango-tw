import React, { FC } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import { UseInfiniteQueryResult } from "react-query";

import { IPost } from "../types";
import PostFeedCard from "./PostFeedCard";
import PostFeedSkeleton from "./PostFeedSkeleton";

interface Props {
  postsQuery: UseInfiniteQueryResult<
    {
      posts: IPost[];
      nextId: string | undefined;
    },
    unknown
  >;
}

const PostFeed: FC<Props> = ({ postsQuery }) => {
  const { data, fetchNextPage, isFetching, isLoading, hasNextPage } =
    postsQuery;
  return (
    <InfiniteScroll
      className="max-w-lg mx-auto pb-4"
      loader={<></>}
      next={() => fetchNextPage()}
      hasMore={hasNextPage ?? false}
      dataLength={
        data?.pages.reduce((sum, post) => post.posts.length + sum, 0) || 0
      }
    >
      {!isLoading && (
        <>
          {data?.pages.map((page) =>
            page.posts.map((post) => (
              <PostFeedCard key={post._id} post={post} />
            ))
          )}
          {data?.pages[0].posts.length === 0 && (
            <p>找不到貼文，請試試其他的關鍵字。</p>
          )}
        </>
      )}
      {(isLoading || isFetching) &&
        [...Array(2)].map((_, i) => <PostFeedSkeleton key={i} />)}
    </InfiniteScroll>
  );
};

export default PostFeed;
