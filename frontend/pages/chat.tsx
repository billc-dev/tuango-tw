import type { NextPage } from "next";
import { useRouter } from "next/router";

import ChatDialog from "domain/Chat/ChatDialog";
import RoomList from "domain/Chat/RoomList";
import PostDialog from "domain/Post/PostDialog";
import LoginOverlay from "domain/User/LoginOverlay";
import NotifySetup from "domain/User/NotifySetup";

const Chat: NextPage = () => {
  const router = useRouter();
  const { chatId, postId } = router.query;
  return (
    <>
      <NotifySetup />
      <LoginOverlay />
      <RoomList />
      {typeof chatId === "string" && <ChatDialog chatId={chatId} />}
      {typeof postId === "string" && <PostDialog postId={postId} />}
    </>
  );
};

export default Chat;
