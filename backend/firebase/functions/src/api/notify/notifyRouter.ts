import * as express from "express";
import * as functions from "firebase-functions";

import axios from "axios";

import { User } from "api/user/userDB";
import asyncWrapper from "middleware/asyncWrapper";
import { isAuthorized, isRegistered } from "middleware/auth";
import { FRONTEND_URL, SUPER_BUY_URL } from "utils/url";

import { FBMessaging } from "./notify";
import Notify from "./notifyDB";
import { notifyGroups, notifyUser } from "./notifyService";

const router = express.Router();

router.get("/messenger_webhook", (req, res) => {
  const VERIFY_TOKEN = functions.config().fb.messenger_verify_token;

  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      return res.status(200).send(challenge);
    } else return res.status(403);
  }
  return res.status(200);
});

router.post(
  "/messenger_webhook",
  asyncWrapper(async (req, res) => {
    const { object, entry } = req.body;
    console.log(entry);

    if (object === "page") {
      entry.forEach(async (entry: { messaging: FBMessaging[] }) => {
        const { sender, recipient, referral } = entry.messaging[0];
        console.log(entry.messaging[0]);

        if (!sender.id) return;
        if (recipient.id !== functions.config().fb.page_id) return;
        if (!referral) return;
        const userId = referral.ref?.trim().split("認證碼:")[1];
        if (!userId) return;

        const user = await User.findById(userId);
        if (!user) return;

        const notify = await Notify.findOne({ username: user.username });
        if (notify) {
          await Notify.updateOne(
            { username: user.username },
            { fbToken: sender.id }
          );
        } else {
          const newNotify = new Notify({
            username: user.username,
            fbToken: sender.id,
          });
          await newNotify.save();
        }
        await User.updateOne({ username: user.username }, { notified: true });
        await notifyUser(
          user.username,
          `您已成功啟用FB通知！超便宜團購連結: ${SUPER_BUY_URL}`
        );
      });
      return res.status(200).send("EVENT_RECEIVED");
    } else return res.status(404);
  })
);

router.post(
  "/groups",
  isAuthorized,
  asyncWrapper(async (req, res) => {
    if (res.locals.user.role === "basic") throw "unauthorized";
    await notifyGroups(req.body.message);

    return res.json({ ok: true });
  })
);

router.post(
  "/setup",
  isRegistered,
  asyncWrapper(async (req, res) => {
    const notify = await Notify.findOne({ username: res.locals.user.username });
    const { code, redirectUrl } = req.body;

    const form = Object.entries({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUrl,
      client_id: functions.config().notify.client_id,
      client_secret: functions.config().notify.client_secret,
    })
      .map(
        (x) =>
          `${encodeURIComponent(x[0])}=${encodeURIComponent(
            x[1] as string | number
          )}`
      )
      .join("&");

    const tokenResponse = await axios.post(
      "https://notify-bot.line.me/oauth/token",
      form
    );
    const token = tokenResponse.data.access_token;

    const statusResponse = await axios.get(
      "https://notify-api.line.me/api/status",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const targetType = statusResponse.data.targetType;

    if (targetType !== "USER") {
      await User.findOneAndUpdate(
        { username: res.locals.user.username },
        { notified: false }
      );
      throw "targetType is not USER";
    }

    if (!notify) {
      const newNotify = new Notify({
        username: res.locals.user.username,
        token: token,
      });
      await newNotify.save();
    } else {
      await Notify.updateOne(
        { username: res.locals.user.username },
        { token: token }
      );
    }

    const user = await User.findOneAndUpdate(
      { username: res.locals.user.username },
      { notified: true },
      { new: true }
    );

    return res.json({ user });
  })
);

interface SendMessageBody {
  userIds: [string];
  message: string;
  postId: string;
}

router.post(
  "/sendMessage",
  isAuthorized,
  asyncWrapper(async (req, res) => {
    if (res.locals.user.role === "basic") throw "unauthorized";

    const { userIds, postId }: SendMessageBody = req.body;
    if (!userIds.length) throw "userIds is empty";
    if (!postId) throw "postId is empty";
    if (!req.body.message) throw "message is empty";

    const message = `
✉️ ${res.locals.user.displayName} 傳送了這則訊息：${req.body.message}
如果有需要，請到貼文的問與答回覆團主！
貼文連結: ${FRONTEND_URL}/posts?postId=${postId}&action=comment`;
    for (let userId of userIds) {
      await notifyUser(userId, message);
    }

    return res.json({ ok: true });
  })
);

export default router;
