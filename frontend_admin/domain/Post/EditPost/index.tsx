import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";

import { shallowPush } from "utils";

import Dialog from "components/Dialog";
import LoadingIndicator from "components/Indicator/LoadingIndicator";

import { usePost } from "../hooks";
import EditPostForm from "./EditPostForm";

interface Props {
  postId: string;
}

const EditPost: FC<Props> = ({ postId }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const postQuery = usePost(postId);

  const handleClose = () => {
    const { edit_post_id, ...query } = router.query;
    shallowPush(router, query);
  };

  useEffect(() => {
    if (postQuery.data) setOpen(true);
  }, [postQuery.data]);

  return (
    <>
      <LoadingIndicator loading={postQuery.isLoading} />
      <Dialog {...{ handleClose, open, title: "編輯貼文" }}>
        {postQuery.data && <EditPostForm post={postQuery.data} />}
      </Dialog>
    </>
  );
};

export default EditPost;
