import type { NextPage } from "next";

import Post from "domain/Post";

const Posts: NextPage = () => {
  return (
    <div className="mx-4">
      <Post />
    </div>
  );
};

export default Posts;
