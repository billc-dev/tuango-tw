import React, { FC, Fragment } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import { UseInfiniteQueryResult } from "react-query";

import { IPostCard } from "../types";
import PostCard from "./PostCard";
import PostCardGrid from "./PostCardGrid";
import PostCardSkeletons from "./PostCardSkeletons";

export interface PostCardsProps {
  postCardsQuery: UseInfiniteQueryResult<
    {
      posts: IPostCard[];
      nextId: string | undefined;
    },
    unknown
  >;
}

const PostCards: FC<PostCardsProps> = ({ postCardsQuery }) => {
  const { data, fetchNextPage, isFetching, isLoading, hasNextPage } =
    postCardsQuery;
  return (
    <InfiniteScroll
      className="pb-16 flex w-full flex-col items-center select-none"
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
          {data?.pages[0].posts.length === 0 && "未找到任何貼文。"}
        </div>
      ) : (
        <div data-testid="post-card-skeletons">
          <PostCardSkeletons />
        </div>
      )}
    </InfiniteScroll>
  );
};

export default PostCards;
