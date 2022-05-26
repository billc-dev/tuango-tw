import * as express from "express";

import Message from "api/message/messageDB";
import { Post } from "api/post";
import { User } from "api/user/userDB";
import asyncWrapper from "middleware/asyncWrapper";
import { isAdmin } from "middleware/auth";

import { notifyUser } from "./notifyService";

const router = express.Router();

router.post(
  "/message",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const { userIds, message, query } = req.body;
    for (const userId of userIds) {
      await notifyUser(userId, message);
    }
    if (query.postNum) {
      const post = await Post.findOne({
        postNum: query.postNum,
        status: { $ne: "canceled" },
      }).select("title displayName");
      if (!post) return;
      query.title = post.title;
      query.displayName = post.displayName;
    }
    const users = await User.find({ username: { $in: userIds } }).select(
      "displayName"
    );
    const messageHistory = new Message({ message, query, sentTo: users });
    try {
      await messageHistory.save();
    } catch (error) {
      console.log(error);
    }
    return res.json({ ok: true });
  })
);

export default router;
