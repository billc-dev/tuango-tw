import { fetchPostCards } from "api/posts";
import Button from "components/Core/Button";
import router from "next/router";
import React, { Fragment } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import PostCard from "./PostCard";
import PostCardSkeleton from "./PostCardSkeleton";

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
  return (
    <div className="flex min-h-screen w-full justify-center">
      <div className="max-w-4xl">
        <Button onClick={() => router.push("/login")}>Login</Button>
        <Button onClick={() => router.push("/")}>Index</Button>
        <Button onClick={fetchNextPage}>Index</Button>
        <InfiniteScroll
          dataLength={
            data?.pages.reduce((sum, post) => post.posts.length + sum, 0) || 0
          }
          loader={
            <div className="grid grid-cols-2 gap-2 px-2 py-0 sm:grid-cols-3 md:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <PostCardSkeleton key={i} />
              ))}
            </div>
          }
          next={fetchNextPage}
          hasMore={true}
        >
          <div className="grid grid-cols-2 gap-2 p-2 sm:grid-cols-3 md:grid-cols-4">
            {data?.pages.map((page, pageIndex) => (
              <Fragment key={page.nextId}>
                {page.posts.map((post, postIndex) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    pageIndex={pageIndex}
                    postIndex={postIndex}
                  />
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
