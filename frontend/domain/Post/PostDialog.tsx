import React, { FC, useEffect, useState } from "react";

import { useRouter } from "next/router";

import Dialog from "components/Dialog";

import PostActions from "./components/PostActions";
import PostContent from "./components/PostContent";
import { usePost } from "./hooks";

interface Props {
  postId: string;
}

const PostDialog: FC<Props> = (props) => {
  const router = useRouter();
  const { postId } = props;
  const [open, setOpen] = useState(false);
  const { data } = usePost(postId);
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

  return data?.post ? (
    <Dialog
      open={open}
      handleClose={() => handleClose()}
      title={data.post.title}
    >
      <PostContent post={data.post} />
      <PostActions post={data.post} />
    </Dialog>
  ) : null;
};

export default PostDialog;
