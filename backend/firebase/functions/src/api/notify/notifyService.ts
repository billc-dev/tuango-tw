import axios from "axios";
import * as FormData from "form-data";

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
