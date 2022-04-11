import * as express from "express";

import { Post } from "api/post";
import asyncWrapper from "middleware/asyncWrapper";
import { isAuthorized } from "middleware/auth";

import { User } from "./userDB";

const router = express.Router();

router.get(
  "/",
  isAuthorized,
  asyncWrapper(async (_req, res) => {
    const user = res.locals.user;
    return res.status(200).json({ user });
  })
);

router.get(
  "/userId/:username",
  isAuthorized,
  asyncWrapper(async (req, res) => {
    const username = req.params.username;
    if (!username) throw "username is required";

    const user = await User.findOne({ username }).select("_id");
    if (!user) throw "user not found";

    return res.status(200).json({ userId: user._id });
  })
);

router.post(
  "/login/update",
  isAuthorized,
  asyncWrapper(async (req, res) => {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) throw "user not found";
    const { displayName, pictureUrl } = user;
    if (user.role !== "basic")
      await Post.updateMany(
        { userId: user.username },
        { displayName, pictureUrl }
      );

    return res.status(200).json({ ok: true });
  })
);

export default router;
