import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useQueryClient } from "react-query";

import PostDialog from "domain/Post/PostDialog";
import PostTypeContainer from "domain/Post/PostTypeContainer";
import { fetchPost } from "domain/Post/api";
import NotifySetup from "domain/User/NotifySetup";

import { IPost } from "../domain/Post/types";

interface Props {
  post: IPost | undefined;
}

const Posts: NextPage<Props> = (props) => {
  const router = useRouter();
  const { post } = props;
  const { postId } = router.query;
  const queryClient = useQueryClient();
  useEffect(() => {
    if (post) queryClient.setQueryData(["post", post._id], { post });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);
  useEffect(() => {
    queryClient.invalidateQueries("deliveredOrderCount");
    queryClient.invalidateQueries("notificationCount");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <NotifySetup />
      <Head>
        {post && (
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
        )}
      </Head>
      <PostTypeContainer />
      {typeof postId === "string" && <PostDialog postId={postId} />}
    </>
  );
};

Posts.getInitialProps = async (ctx: NextPageContext) => {
  const postId = ctx.query.postId;
  if (!postId || typeof postId !== "string") return { post: undefined };
  try {
    const data = await fetchPost(postId);
    return { post: data.post };
  } catch (error) {
    return { post: undefined };
  }
};

export default Posts;
