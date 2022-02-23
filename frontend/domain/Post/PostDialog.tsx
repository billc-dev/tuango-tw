import React, { FC, useEffect, useState } from "react";

import { useRouter } from "next/router";

import Dialog from "components/Dialog";

import PostActions from "./components/PostActions";
import PostContent from "./components/PostContent";
import { usePost } from "./hooks";

interface Props {
  id: string;
}

const PostDialog: FC<Props> = (props) => {
  const router = useRouter();
  const { id } = props;
  const [open, setOpen] = useState(false);
  const { data } = usePost(id);
  const handleClose = () => {
    router.push({ query: { ...router.query, id: "" } }, undefined, {
      shallow: true,
    });
  };

  useEffect(() => {
    if (id) setOpen(true);
    else setOpen(false);
  }, [id]);

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
