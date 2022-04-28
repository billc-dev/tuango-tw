import axios from "axios";
import * as FormData from "form-data";

import { Post } from "api/post/postDB";
import { IS_DEV } from "utils/constant";

import Notify from "./notifyDB";

export const notifyUser = async (
  username: string,
  message: string,
  imageUrl?: string
) => {
  try {
    const notify = await Notify.findOne({ username });
    if (!notify) return;

    const data = new FormData();
    const image = imageUrl ? imageUrl : "";
    data.append("message", message);
    if (image) {
      data.append("imageThumbnail", image);
      data.append("imageFullsize", image);
    }
    await axios.post("https://notify-api.line.me/api/notify", data, {
      headers: {
        Authorization: `Bearer ${notify.token}`,
        ...data.getHeaders(),
      },
    });
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
