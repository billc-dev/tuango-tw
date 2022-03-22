import { useRouter } from "next/router";
import React from "react";

import Completed from "domain/Order/UserOrders/Completed";
import Liked from "domain/Order/UserOrders/Liked";
import NormalOrders from "domain/Order/UserOrders/NormalOrders";
import PostDialog from "domain/Post/PostDialog";

const Status = () => {
  const {
    query: { status, postId },
  } = useRouter();

  const renderedComponent = () => {
    switch (status) {
      case "liked":
        return <Liked />;
      case "completed":
        return <Completed />;
      case "ordered":
      case "delivered":
      case "missing":
      case "canceled":
        return <NormalOrders status={status} />;
      default:
        return null;
    }
  };
  return (
    <>
      {renderedComponent()}
      {typeof postId === "string" && <PostDialog postId={postId} />}
    </>
  );
};

export default Status;
