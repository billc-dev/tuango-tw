import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";

import { useQueryClient } from "react-query";

import { IUser } from "api/auth/userDB";
import Dialog from "components/Dialog";
import LoadingIndicator from "components/Indicator/LoadingIndicator";
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
    const { chatId, roomId, firstMessageId, ...query } = router.query;
    shallowPush(router, query);
  };

  useEffect(() => (chatId ? setOpen(true) : setOpen(false)), [chatId]);
  useEffect(() => {
    if (!data?.data.room._id) return;
    shallowPush(router, { ...router.query, roomId: data.data.room._id });
  }, [data?.data.room._id]);

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
        </Dialog>
      )}
    </>
  );
};

export default ChatDialog;
