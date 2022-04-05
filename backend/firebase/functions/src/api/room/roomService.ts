import { IMessage } from "api/message/messageDB";

import { IRoom, IRoomUser, Room } from "./roomDB";

export const updateRoomLastMessage = async (
  message: IMessage,
  room: IRoom,
  otherUser: IRoomUser
) => {
  let lastMessage = "";
  if (message.type === "text" && message.text) lastMessage = message.text;
  else if (message.type === "imageUrl") lastMessage = "傳送了照片";
  else if (message.type === "order") lastMessage = "傳送了訂單";
  else if (message.type === "post") lastMessage = "傳送了貼文";

  await Room.updateOne(
    { _id: room._id, "users.user": otherUser.user.toString() },
    {
      lastMessage: lastMessage,
      lastCreatedAt: message.createdAt,
      $inc: { "users.$.notifications": 1 },
      hasMessage: true,
    }
  );
};
