import * as dayjs from "dayjs";

import { notifyUser } from "api/notify/notifyService";
import { User } from "api/user/userDB";
import { FRONTEND_URL } from "utils/url";

import { MessageType } from "./messageDB";

export const parseMessageType = (type: any): MessageType => {
  if (["text", "order", "post", "imageUrl"].includes(type)) return type;
  throw "type not allowed";
};

export const notifyUserForNewMessage = async (userId: string) => {
  try {
    const user = await User.findById(userId).select("username message");
    if (!user) return;
    if (!user.message.notified) {
      await notifyUser(user.username, `\n您有新的訊息！ ${FRONTEND_URL}/chat`);
      await User.updateOne(
        { _id: user._id },
        { message: { notified: true, notifiedAt: new Date().toISOString() } }
      );
    } else {
      const timeDiff = dayjs().diff(user.message.notifiedAt, "minute");
      if (timeDiff >= 5) {
        await notifyUser(
          user.username,
          `\n您有新的訊息！ ${FRONTEND_URL}/chat`
        );
        await User.updateOne(
          { _id: user._id },
          {
            message: { notified: true, notifiedAt: new Date().toISOString() },
          }
        );
      }
    }
  } catch (err) {
    console.log(err);
  }
};
