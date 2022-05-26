import Head from "next/head";
import React, { FC } from "react";

import { IPost } from "./types";

interface Props {
  post: IPost | undefined;
}

const PostHead: FC<Props> = ({ post }) => {
  if (!post) return null;
  return (
    <Head>
      <title>
        #{post.postNum} {post.title} #{post.displayName} - 善化超便宜團購
      </title>
      <meta
        itemProp="name"
        content={`#${post.postNum} ${post.title} #${post.displayName} - 善化超便宜團購`}
      />
      <meta name="description" content={post.body.slice(0, 150)} />
      <meta property="og:image" content={post.imageUrls[0].md} />
    </Head>
  );
};

export default PostHead;
