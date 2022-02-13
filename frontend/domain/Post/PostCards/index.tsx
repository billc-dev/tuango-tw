import { fetchPostCards } from "domain/Post/api/post";
import React, { Fragment } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import PostCard from "./PostCard";
import PostCardGrid from "./PostCardGrid";
import PostCardSkeletons from "./PostCardSkeletons";

const PostCards = () => {
  const { data, fetchNextPage, isFetching, isLoading } = useInfiniteQuery(
    "posts",
    ({ pageParam = "initial" }) => fetchPostCards(pageParam),
    { getNextPageParam: (lastPage) => lastPage.nextId }
  );
  // return <div className="p-4">{JSON.stringify(data?.pages, null, 2)}</div>;
  return (
    <div className="flex w-full flex-col items-center">
      <InfiniteScroll
        className="p-2"
        loader={
          <div data-testid="post-card-skeletons">
            <PostCardSkeletons />
          </div>
        }
        next={fetchNextPage}
        hasMore={true} // add to api => read last page
        dataLength={
          data?.pages.reduce((sum, post) => post.posts.length + sum, 0) || 0
        }
      >
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
      </InfiniteScroll>
    </div>
  );
};

export default PostCards;
