import { fetchPostCards } from "api/posts";
import Button from "components/Core/Button";
import router from "next/router";
import React, { Fragment } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import PostCard from "./components/PostCard";
import PostCardGrid from "./components/PostCardGrid";
import PostCardSkeleton from "./components/PostCardSkeleton";
import PostCardSkeletons from "./components/PostCardSkeletons";

const PostCards = () => {
  const { data, fetchNextPage, isFetching, isLoading } = useInfiniteQuery(
    "posts",
    ({ pageParam = "initial" }) => fetchPostCards(pageParam),
    { getNextPageParam: (lastPage) => lastPage.nextId }
  );
  // return <div className="p-4">{JSON.stringify(data?.pages, null, 2)}</div>;
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-zinc-100 dark:bg-zinc-900">
      <div>
        <Button onClick={() => router.push("/login")}>Login</Button>
        <Button onClick={() => router.push("/")}>Index</Button>
      </div>
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
