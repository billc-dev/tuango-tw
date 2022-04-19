import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";

import Dialog from "components/Dialog";
import LoadingIndicator from "components/Indicator/LoadingIndicator";
import * as gtag from "domain/GoogleAnalytics/gtag";
import { shallowPush } from "utils/routing";

import PostHead from "./PostHead";
import PostActions from "./components/PostActions";
import PostContent from "./components/PostContent";
import { usePost } from "./hooks";

const ChatDialog = dynamic(() => import("domain/Chat/ChatDialog")) as ({
  chatId,
}: {
  chatId: string;
}) => JSX.Element;
interface Props {
  postId: string;
  chat?: boolean;
}

const PostDialog: FC<Props> = ({ postId, chat }) => {
  const router = useRouter();
  const { chatId } = router.query;
  const [open, setOpen] = useState(false);
  const { data, isLoading } = usePost(postId);
  const handleClose = () => {
    if (!chat) {
      const { postId, action, ...query } = router.query;
      shallowPush(router, query);
    } else {
      const { chatPostId, action, ...query } = router.query;
      shallowPush(router, query);
    }
  };

  useEffect(() => {
    if (postId) setOpen(true);
    else setOpen(false);
  }, [postId]);

  useEffect(() => {
    if (!open) return;
    if (!data) return;
    gtag.event("view_item", {
      event_category: "view_post",
      event_label: data.post.postNum + data.post.title,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, data?.post]);

  return (
    <>
      <LoadingIndicator loading={isLoading} />
      {data?.post && (
        <Dialog open={open} handleClose={handleClose} title={data.post.title}>
          <PostHead post={data.post} />
          <PostContent post={data.post} />
          <PostActions post={data.post} />
          {!chat && typeof chatId === "string" && (
            <ChatDialog chatId={chatId} />
          )}
        </Dialog>
      )}
    </>
  );
};

export default PostDialog;
