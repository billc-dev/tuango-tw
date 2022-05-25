import type { NextPage } from "next";
import Head from "next/head";

import Post from "domain/Post";

const Posts: NextPage = () => {
  return (
    <div className="mx-4">
      <Head>
        <title>貼文 - 開心團購後台</title>
      </Head>
      <Post />
    </div>
  );
};

export default Posts;
