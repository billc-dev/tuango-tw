import React, { FC, useEffect, useState } from "react";

import { useRouter } from "next/router";

import Dialog from "components/Dialog";
import AnimatedSpinner from "components/svg/AnimatedSpinner";

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
    router.push(
      { query: { ...router.query, postId: "", action: "" } },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    if (postId) setOpen(true);
    else setOpen(false);
  }, [postId]);

  return (
    <>
      <div
        className={`rounded shadow transition-opacity bg-zinc-200 p-1.5 fixed bottom-16 right-3 z-50 ${
          isLoading ? "opacity-95" : "opacity-0"
        }`}
      >
        {isLoading && <AnimatedSpinner />}
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
