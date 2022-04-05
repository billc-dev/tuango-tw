import { useRouter } from "next/router";
import React from "react";

import Extra from "domain/Order/Extra";
import PostDialog from "domain/Post/PostDialog";

const extra = () => {
  const { query } = useRouter();
  return (
    <div className="m-auto max-w-sm px-2 pt-2">
      <p className="text-xl">😍待認購</p>
      <p className="text-lg">如果想要認購麻煩私訊MAY</p>
      <Extra />
      {typeof query.postId === "string" && <PostDialog postId={query.postId} />}
    </div>
  );
};

export default extra;
