import type { NextPage } from "next";
import { useRouter } from "next/router";

import ChatDialog from "domain/Chat/ChatDialog";
import RoomList from "domain/Chat/RoomList";
import LoginOverlay from "domain/User/LoginOverlay";

const Chat: NextPage = () => {
  const router = useRouter();
  const { chatId } = router.query;
  return (
    <>
      <LoginOverlay />
      <RoomList />
      {typeof chatId === "string" && <ChatDialog chatId={chatId} />}
    </>
  );
};

export default Chat;
