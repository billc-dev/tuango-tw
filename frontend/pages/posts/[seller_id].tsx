import type { NextPage } from "next";
import { useRouter } from "next/router";

import PostDialog from "domain/Post/PostDialog";
import PostTypeContainer from "domain/Post/PostTypeContainer";
import NotifySetup from "domain/User/NotifySetup";

const SellerPosts: NextPage = () => {
  const router = useRouter();
  const { postId } = router.query;
  if (!router.isReady) return null;
  if (typeof router.query.seller_id !== "string") router.push("/posts");
  return (
    <>
      <NotifySetup />
      <PostTypeContainer
        fb={false}
        seller_id={router.query.seller_id as string}
      />
      {typeof postId === "string" && <PostDialog postId={postId} />}
    </>
  );
};

export default SellerPosts;
