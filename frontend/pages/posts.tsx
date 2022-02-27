import { useEffect } from "react";

import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";

import Container from "components/Container";
import PostCards from "domain/Post/PostCards";
import PostDialog from "domain/Post/PostDialog";
import { fetchPost } from "domain/Post/api";
import { useInfinitePostQuery } from "domain/Post/hooks";

import { IPost } from "../domain/Post/types";

interface Props {
  post: IPost | undefined;
}

const Posts: NextPage<Props> = (props) => {
  const router = useRouter();
  const { post } = props;
  const { id } = router.query;
  const queryClient = useQueryClient();
  const limit = 16;
  const postsQuery = useInfinitePostQuery(limit);
  useEffect(() => {
    if (post) queryClient.setQueryData(["post", post._id], { post });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);
  return (
    <>
      <Head>
        {post ? (
          <>
            <title>
              #{post?.postNum} {post?.title} #{post?.displayName} - 開心團購
            </title>
            <meta
              itemProp="name"
              content={`#${post?.postNum} ${post?.title} #${post?.displayName} - 開心團購`}
            />
            <meta name="description" content={post?.body} />
            <meta property="og:image" content={post?.imageUrls[0].md} />
          </>
        ) : (
          <>
            <title>開心團購</title>
            <meta
              name="description"
              content="開心鮮拼鮮難瘦團，就是買買買，不買難受，買了難瘦，歡迎加入買買買。"
            />
          </>
        )}
      </Head>
      <Container>
        <PostCards postsQuery={postsQuery} />
      </Container>
      {typeof id === "string" && <PostDialog id={id} />}
    </>
  );
};

Posts.getInitialProps = async (ctx: NextPageContext) => {
  const id = ctx.query.id as string;
  if (!id || typeof id !== "string") return { post: undefined };
  try {
    const data = await fetchPost(id);
    return { post: data.post };
  } catch (error) {
    return { post: undefined };
  }
};

export default Posts;
