import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";

import { shallowPush } from "utils";

import Button from "components/Button";
import Dialog from "components/Dialog";
import LoadingIndicator from "components/Indicator/LoadingIndicator";
import { useSubmitting } from "hooks";

import { usePost } from "../hooks";
import EditPostForm from "./EditPostForm";

interface Props {
  postId: string;
}

const EditPost: FC<Props> = ({ postId }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const postQuery = usePost(postId);
  const submittingQuery = useSubmitting();

  const handleClose = () => {
    const { edit_post_id, ...query } = router.query;
    shallowPush(router, query);
  };

  useEffect(() => {
    if (postQuery.data) setOpen(true);
  }, [postQuery.data]);

  useEffect(() => {
    return () => postQuery.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <LoadingIndicator loading={postQuery.isLoading} />
      <Dialog
        {...{
          handleClose,
          open,
          title: "編輯貼文",
          action: (
            <Button
              variant="primary"
              form="post-form"
              type="submit"
              size="lg"
              loading={submittingQuery.data}
            >
              編輯貼文
            </Button>
          ),
        }}
      >
        {postQuery.data && <EditPostForm post={postQuery.data} />}
      </Dialog>
    </>
  );
};

export default EditPost;
