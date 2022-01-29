import { fetchPost, fetchPosts } from "api/posts";
import Button from "components/Core/Button";
import PostCard from "components/Post/PostCard";
import PostDialog from "components/Post/PostDialog";
import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Post } from "types";

interface Props {
  post: Post | undefined;
}

const Posts: NextPage<Props> = (props) => {
  const { post } = props;
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, fetchNextPage } = useInfiniteQuery(
    "posts",
    ({ pageParam = "initial" }) => fetchPosts(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.nextId,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: true,
    }
  );

  if (isLoading) return <div>loading</div>; // loading skeleton
  return (
    <>
      {post && (
        <Head>
          <title>
            #{post?.postNum} {post?.title} #{post?.displayName} - 開心團購
          </title>
          <meta
            itemProp="name"
            content={`#${post?.postNum} ${post?.title} #${post?.displayName} - 開心團購`}
          />
          <meta name="description" content={post?.body} />
          <meta property="og:image" content={post?.imageUrls[0].md} />
        </Head>
      )}
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
      {typeof id === "string" && <PostDialog id={id} />}
    </>
  );
};

Posts.getInitialProps = async (ctx: NextPageContext) => {
  // const isSSR = typeof window === "undefined";
  const id = ctx.query.id as string;
  if (!id || typeof id !== "string") return { post: undefined };
  const data = await fetchPost(id);
  return { post: data.post };
};

// ssr return post
// no ssr, react query fetch post

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
