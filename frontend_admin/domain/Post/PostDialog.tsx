import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";

import { shallowPush } from "utils";

import Dialog from "components/Dialog";
import LoadingIndicator from "components/Indicator/LoadingIndicator";

import PostContent from "./components/PostContent";
import { usePost } from "./hooks";
import { getFullTitle } from "./services";

interface Props {
  postId: string;
}

const PostDialog: FC<Props> = ({ postId }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { data: post, isLoading } = usePost(postId);
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
      {post && (
        <Dialog
          open={open}
          handleClose={handleClose}
          title={getFullTitle(post)}
        >
          <PostContent post={post} />
          {post.items.map((item) => (
            <div key={item._id}>
              {item.id}.{item.item} ${item.price}
            </div>
          ))}
        </Dialog>
      )}
    </>
  );
};

export default PostDialog;
