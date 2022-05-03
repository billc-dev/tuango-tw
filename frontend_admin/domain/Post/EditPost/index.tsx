import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";

import { DocumentAddIcon } from "@heroicons/react/outline";
import { shallowPush } from "utils";

import Button from "components/Button";
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
      <Dialog
        {...{
          handleClose,
          open,
          title: "編輯貼文",
          action: (
            <Button
              icon={<DocumentAddIcon />}
              variant="primary"
              form="post-form"
              type="submit"
              size="lg"
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
