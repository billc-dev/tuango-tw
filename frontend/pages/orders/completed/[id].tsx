import { useRouter } from "next/router";
import React from "react";

import CompletedCard from "domain/Order/UserOrders/CompletedCard";
import { useComplete } from "domain/Order/hooks";
import PostDialog from "domain/Post/PostDialog";

const ID = () => {
  const router = useRouter();
  const { postId } = router.query;
  const completeQuery = useComplete(router.query.id as string);
  if (!completeQuery.data) return null;
  return (
    <div className="max-w-sm">
      <p className="mx-6 mt-2">{completeQuery.data.displayName}</p>
      <CompletedCard complete={completeQuery.data} />
      {typeof postId === "string" && <PostDialog postId={postId} />}
    </div>
  );
};

export default ID;
