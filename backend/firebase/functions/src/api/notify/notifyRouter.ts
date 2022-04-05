import * as express from "express";
import * as functions from "firebase-functions";

import axios from "axios";

import { User } from "api/user/userDB";
import asyncWrapper from "middleware/asyncWrapper";
import { isAuthorized } from "middleware/auth";

import Notify from "./notifyDB";
import { notifyGroups } from "./notifyService";

const router = express.Router();

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
  isAuthorized,
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
    console.log("token", token);

    const statusResponse = await axios.get(
      "https://notify-api.line.me/api/status",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const targetType = statusResponse.data.targetType;
    console.log("targetType", targetType);

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

export default router;
