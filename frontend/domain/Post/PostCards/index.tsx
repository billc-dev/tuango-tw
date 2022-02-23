import React, { FC, Fragment } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import { UseInfiniteQueryResult } from "react-query";

import { IPostCard } from "../types";
import PostCard from "./PostCard";
import PostCardGrid from "./PostCardGrid";
import PostCardSkeletons from "./PostCardSkeletons";

interface Props {
  postsQuery: UseInfiniteQueryResult<
    {
      posts: IPostCard[];
      nextId: number;
      hasMore: boolean;
    },
    unknown
  >;
}

const PostCards: FC<Props> = ({ postsQuery }) => {
  const { data, fetchNextPage, isFetching, isLoading } = postsQuery;
  return (
    <div className="flex w-full flex-col items-center">
      <InfiniteScroll
        loader={
          isFetching && (
            <div data-testid="post-card-skeletons">
              <PostCardSkeletons />
            </div>
          )
        }
        next={fetchNextPage}
        hasMore={data?.pages[data.pages.length - 1].hasMore || false} // add to api => read last page
        dataLength={
          data?.pages.reduce((sum, post) => post.posts.length + sum, 0) || 0
        }
      >
        {!isLoading && (
          <div data-testid="post-cards">
            <PostCardGrid>
              {data?.pages.map((page) => (
                <Fragment key={page.nextId}>
                  {page.posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </Fragment>
              ))}
            </PostCardGrid>
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default PostCards;
