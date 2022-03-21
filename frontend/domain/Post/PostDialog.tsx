import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";

import Dialog from "components/Dialog";
import AnimatedSpinner from "components/svg/AnimatedSpinner";
import { shallowPush } from "utils/routing";

import PostActions from "./components/PostActions";
import PostContent from "./components/PostContent";
import { usePost } from "./hooks";

interface Props {
  postId: string;
}

const PostDialog: FC<Props> = ({ postId }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { data, isLoading } = usePost(postId);

  const handleClose = () => {
    const { postId, action, ...query } = router.query;
    shallowPush(router, query);
  };

  useEffect(() => {
    if (postId) setOpen(true);
    else setOpen(false);
  }, [postId]);

  return (
    <>
      <div
        className={`rounded shadow transition-opacity bg-zinc-200 p-1.5 fixed top-16 left-3 z-50 ${
          isLoading ? "opacity-95" : "opacity-0"
        }`}
      >
        <AnimatedSpinner />
      </div>
      {data?.post && (
        <Dialog open={open} handleClose={handleClose} title={data.post.title}>
          <PostContent post={data.post} />
          <PostActions post={data.post} />
        </Dialog>
      )}
    </>
  );
};

export default PostDialog;
