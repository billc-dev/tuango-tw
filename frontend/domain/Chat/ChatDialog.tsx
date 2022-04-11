import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";

import { useQueryClient } from "react-query";

import { IUser } from "api/auth/userDB";
import Dialog from "components/Dialog";
import LoadingIndicator from "components/Indicator/LoadingIndicator";
import PostDialog from "domain/Post/PostDialog";
import { useUser } from "domain/User/hooks";
import { shallowPush } from "utils/routing";

import MessageBar from "./MessageBar";
import Messages from "./Messages";
import { useRoom } from "./hooks";

interface Props {
  chatId: string;
}

const ChatDialog: FC<Props> = ({ chatId }) => {
  const router = useRouter();
  const { chatPostId } = router.query;
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useRoom(chatId);
  const queryClient = useQueryClient();
  const userQuery = useUser();
  const otherUser = data?.data.room.users?.find((u) => {
    if (typeof u.user === "string") return false;
    return u.user._id !== userQuery.data?.data.user._id;
  });

  const handleClose = () => {
    queryClient.invalidateQueries(["rooms"]);
    const { chatId, roomId, firstMessageId, chatPostId, ...query } =
      router.query;
    shallowPush(router, query);
  };

  useEffect(() => (chatId ? setOpen(true) : setOpen(false)), [chatId]);
  useEffect(() => {
    if (!data?.data.room._id) return;
    shallowPush(router, { ...router.query, roomId: data.data.room._id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data.room._id]);
  useEffect(() => {
    return () => {
      queryClient.invalidateQueries("notificationCount");
      queryClient.invalidateQueries("rooms");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <LoadingIndicator loading={isLoading} />
      {data?.data.room && (
        <Dialog
          id="chatDialog"
          open={open}
          handleClose={handleClose}
          title={(otherUser?.user as IUser).displayName}
        >
          <div className="mb-12">
            <Messages roomId={data.data.room._id} otherUser={otherUser} />
          </div>
          <MessageBar roomId={data.data.room._id} />
          {typeof chatPostId === "string" && (
            <PostDialog postId={chatPostId} chat />
          )}
        </Dialog>
      )}
    </>
  );
};

export default ChatDialog;
