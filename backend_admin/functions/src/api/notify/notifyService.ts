import * as functions from "firebase-functions";

import axios from "axios";
import * as FormData from "form-data";

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
