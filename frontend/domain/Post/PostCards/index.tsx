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
      nextId: number | undefined;
    },
    unknown
  >;
}

const PostCards: FC<Props> = ({ postsQuery }) => {
  const { data, fetchNextPage, isFetching, isLoading, hasNextPage } =
    postsQuery;
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
        next={() => fetchNextPage()}
        hasMore={hasNextPage ?? false}
        dataLength={
          data?.pages.reduce((sum, post) => post.posts.length + sum, 0) || 0
        }
      >
        {!isLoading ? (
          <div data-testid="post-cards">
            <PostCardGrid>
              {data?.pages.map((page, index) => (
                <Fragment key={index}>
                  {page.posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </Fragment>
              ))}
            </PostCardGrid>
            {data?.pages[0].posts.length === 0 &&
              "找不到貼文，請試試其他的關鍵字。"}
          </div>
        ) : (
          <div data-testid="post-card-skeletons">
            <PostCardSkeletons />
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default PostCards;
