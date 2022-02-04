import { fetchPostCards } from "api/posts";
import Button from "components/Core/Button";
import router from "next/router";
import React, { Fragment } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import PostCard from "./components/PostCard";
import PostCardSkeleton from "./components/PostCardSkeleton";

const PostCards = () => {
  const { data, fetchNextPage } = useInfiniteQuery(
    "posts",
    ({ pageParam = "initial" }) => fetchPostCards(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.nextId,
      staleTime: 1000 * 60 * 1,
      refetchOnWindowFocus: true,
    }
  );
  // return <div className="p-4">{JSON.stringify(data?.pages, null, 2)}</div>;
  return (
    <div className="flex min-h-screen w-full justify-center">
      <div className="max-w-4xl">
        <Button onClick={() => router.push("/login")}>Login</Button>
        <Button onClick={() => router.push("/")}>Index</Button>
        <InfiniteScroll
          dataLength={
            data?.pages.reduce((sum, post) => post.posts.length + sum, 0) || 0
          }
          loader={
            <div
              className="grid grid-cols-2 gap-2 px-2 py-0 sm:grid-cols-3 md:grid-cols-4"
              data-testid="post-card-skeletons"
            >
              {[...Array(4)].map((_, i) => (
                <PostCardSkeleton key={i} />
              ))}
            </div>
          }
          next={() => fetchNextPage}
          hasMore={true} // add to api => read last page
        >
          <div
            className="grid grid-cols-2 gap-2 p-2 sm:grid-cols-3 md:grid-cols-4"
            data-testid="post-cards"
          >
            {data?.pages.map((page) => (
              <Fragment key={page.nextId}>
                {page.posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </Fragment>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default PostCards;
