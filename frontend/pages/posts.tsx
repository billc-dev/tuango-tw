import { fetchPost } from "api/posts";
import PostCards from "components/Post/PostCards";
import PostDialog from "components/Post/PostDialog";
import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Post } from "types";

interface Props {
  post: Post | undefined;
}

const Posts: NextPage<Props> = (props) => {
  const { post } = props;
  const router = useRouter();
  const { id } = router.query;

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
      <PostCards />
      {typeof id === "string" && <PostDialog id={id} />}
    </>
  );
};

Posts.getInitialProps = async (ctx: NextPageContext) => {
  const id = ctx.query.id as string;
  if (!id || typeof id !== "string") return { post: undefined };
  const data = await fetchPost(id);
  return { post: data.post };
};

export default Posts;
