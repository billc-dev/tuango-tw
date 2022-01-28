import { fetchPosts } from "api/posts";
import Button from "components/Button";
import PostCard from "components/PostCard";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroller";

const Posts: NextPage = () => {
  const router = useRouter();
  const { data, isLoading, fetchNextPage } = useInfiniteQuery(
    "posts",
    ({ pageParam = "initial" }) => fetchPosts(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.nextId,
      staleTime: Infinity,
      // refetchOnWindowFocus: true,
    }
  );

  // const { data, isLoading } = useQuery("posts", () => fetchPosts("initial"), {
  //   staleTime: 1000 * 60,
  //   refetchOnWindowFocus: true,
  // });
  if (isLoading) return <div>loading</div>;
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

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const queryClient = new QueryClient();
//   await queryClient.prefetchInfiniteQuery("posts", () =>
//     fetchPosts("initial", { cookie: ctx.req?.headers.cookie })
//   );

//   queryClient.setQueryData("posts", (data) => ({
//     ...(data as object),
//     pageParams: ["initial"],
//   }));

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// };

export default Posts;
