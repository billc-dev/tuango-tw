import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";

import Dialog from "components/Dialog";
import LoadingIndicator from "components/Indicator/LoadingIndicator";
import LoginDialog from "domain/User/LoginDialog";
import { shallowPush } from "utils/routing";

import PostHead from "./PostHead";
import PostActions from "./components/PostActions";
import PostContent from "./components/PostContent";
import { usePost } from "./hooks";
import { getFullTitle } from "./services";

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

  return (
    <>
      <LoadingIndicator loading={isLoading} />
      <LoginDialog />
      {data?.post && (
        <Dialog
          open={open}
          handleClose={handleClose}
          title={getFullTitle(data.post)}
        >
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
