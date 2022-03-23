import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";

import Dialog from "components/Dialog";
import LoadingIndicator from "components/Indicator/LoadingIndicator";
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
      <LoadingIndicator loading={isLoading} />
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
