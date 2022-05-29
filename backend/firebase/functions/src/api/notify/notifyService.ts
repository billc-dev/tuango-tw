import * as functions from "firebase-functions";

import axios from "axios";
import * as FormData from "form-data";

import { Post } from "api/post/postDB";
import { IS_DEV } from "utils/constant";
import { FRONTEND_URL, SUPER_BUY_URL } from "utils/url";

import Notify from "./notifyDB";

export const notifyUser = async (
  username: string,
  message: string,
  imageUrl?: string
) => {
  try {
    const notify = await Notify.findOne({ username });
    if (!notify) return;
    if (notify.token) sendLineMessage(message, notify.token, imageUrl);
    else if (notify.fbToken) {
      sendFBMessage(
        message.replace(new RegExp(FRONTEND_URL), SUPER_BUY_URL),
        notify.fbToken
      );
    }
  } catch (err) {
    console.log(err);
  }
};

export const notifyGroups = async (message: string, imageUrl?: string) => {
  if (!IS_DEV) {
    for (let i = 1; i < 5; i++) {
      await notifyUser(String(i), message, imageUrl);
    }
    return;
  }
  await notifyUser("test", message, imageUrl);
};

export const notifyDeliveredPostCount = async (deliveryDate: string) => {
  const postCount = await Post.countDocuments({
    deliveryDate: deliveryDate,
    status: { $ne: "canceled" },
  });
  if (postCount >= 20 && postCount % 5 === 0)
    notifyUser("MBA_TUANGO", `${deliveryDate}目前有${postCount}張單`);
};

const sendLineMessage = async (
  message: string,
  token: string,
  imageUrl?: string
) => {
  const data = new FormData();
  const image = imageUrl ? imageUrl : "";
  data.append("message", message);
  if (image) {
    data.append("imageThumbnail", image);
    data.append("imageFullsize", image);
  }
  await axios.post("https://notify-api.line.me/api/notify", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      ...data.getHeaders(),
    },
  });
};

const sendFBMessage = async (message: string, token: string) => {
  await axios.post(
    "https://graph.facebook.com/v13.0/me/messages",
    {
      recipient: { id: token },
      message: { text: message },
      messaging_type: "MESSAGE_TAG",
      tag: "POST_PURCHASE_UPDATE",
    },
    { params: { access_token: functions.config().fb.page_access_token } }
  );
};
