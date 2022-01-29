import { fetchPosts } from "api/posts";
import Button from "components/Core/Button";
import router, { useRouter } from "next/router";
import React, { Fragment } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import PostCard from "./PostCard";

const PostCards = () => {
  // const router = useRouter()
  const { data, isLoading, fetchNextPage } = useInfiniteQuery(
    "posts",
    ({ pageParam = "initial" }) => fetchPosts(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.nextId,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: true,
    }
  );
  return (
    <div className="flex min-h-screen justify-center">
      <div className="max-w-4xl">
        <Button onClick={() => router.push("/login")}>Login</Button>
        <Button onClick={() => router.push("/")}>Index</Button>
        <Button onClick={fetchNextPage}>Index</Button>
        <InfiniteScroll
          pageStart={0}
          loadMore={() => fetchNextPage()}
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
