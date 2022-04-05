import type { NextPage, NextPageContext } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import {
  PlayIcon,
  ShoppingBagIcon,
  ViewGridIcon,
} from "@heroicons/react/outline";
import { useQueryClient } from "react-query";

import NavigationButton from "components/Button/NavigationButton";
import Container from "components/Container";
import PostDialog from "domain/Post/PostDialog";
import { fetchPost } from "domain/Post/api";
import {
  useInfinitePostCardQuery,
  useInfinitePostsQuery,
} from "domain/Post/hooks";
import NotifySetup from "domain/User/NotifySetup";
import { getViewMode, setStorageViewMode } from "services/setting";

import { IPost } from "../domain/Post/types";

const PostCards = dynamic(() => import("domain/Post/PostCards"), {
  ssr: false,
});
const PostFeed = dynamic(() => import("domain/Post/PostFeed"), { ssr: false });
interface Props {
  post: IPost | undefined;
}

const limit = 20;

const Posts: NextPage<Props> = (props) => {
  const router = useRouter();
  const [viewMode, setViewMode] = useState(getViewMode());
  const { post } = props;
  const { postId } = router.query;
  const queryClient = useQueryClient();
  const postCardsQuery = useInfinitePostCardQuery(limit, {
    enabled: viewMode === "cards",
  });
  const postsQuery = useInfinitePostsQuery(limit, {
    enabled: viewMode === "feed",
  });
  useEffect(() => {
    if (post) queryClient.setQueryData(["post", post._id], { post });
    return () => {
      postCardsQuery.remove();
      postsQuery.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

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
      <Container>
        <div className="flex -mb-2">
          <NavigationButton
            text="切換檢視模式"
            className="pt-2"
            onClick={() => {
              const newMode = viewMode === "cards" ? "feed" : "cards";
              setViewMode(newMode);
              setStorageViewMode(newMode);
            }}
          >
            <ViewGridIcon />
          </NavigationButton>
          <NavigationButton text="待認購" path="/extra" className="pt-2">
            <ShoppingBagIcon />
          </NavigationButton>
          <NavigationButton
            text="使用教學"
            className="pt-2"
            onClick={() =>
              window.open(
                "https://www.youtube.com/watch?v=KbK42kgCpSo&list=PLgI1o1ZOlTxuii4gt0GXjM5m-K1j6eJSy&index=2&ab_channel=BillCheng"
              )
            }
          >
            <PlayIcon />
          </NavigationButton>
        </div>
        {viewMode === "cards" && <PostCards postCardsQuery={postCardsQuery} />}
        {viewMode === "feed" && <PostFeed postsQuery={postsQuery} />}
      </Container>
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
