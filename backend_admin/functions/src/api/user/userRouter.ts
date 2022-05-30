import * as express from "express";

import { notifyUser } from "api/notify/notifyService";
import asyncWrapper from "middleware/asyncWrapper";
import { isAdmin } from "middleware/auth";
import { FRONTEND_URL } from "utils/url";

import { User } from "./userDB";
import { parseUserQueryData } from "./userService";

const router = express.Router();

router.get(
  "/me",
  isAdmin,
  asyncWrapper(async (_req, res) => {
    const user = res.locals.user;
    return res.status(200).json({ user });
  })
);

router.get(
  "/:userId",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) throw "user not found";
    return res.status(200).json({ user });
  })
);

router.get(
  "/pickupNum/:pickupNum",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const pickupNum = req.params.pickupNum;
    if (!pickupNum) throw "pickupNum is required";
    const user = await User.findOne({ pickupNum });
    if (!user) throw "user not found";
    return res.status(200).json({ user });
  })
);

router.get(
  "/:username/comment",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const username = req.params.username;
    const user = await User.findOne({ username }).select("comment");
    if (!user) throw "user not found";
    return res.status(200).json({ comment: user.comment });
  })
);

router.post(
  "/",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const { name, isSeller } = req.body;
    if (!name) throw "name invalid";
    const filter = {
      displayName: new RegExp(name, "i"),
      ...(isSeller && { role: { $ne: "basic" } }),
    };

    const users = await User.find(filter);
    return res.status(200).json({ users });
  })
);

router.post(
  "/paginate",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const { limit, page, query } = parseUserQueryData(req.body);
    const users = await User.find(query)
      .skip(page * limit)
      .limit(limit)
      .sort("-createdAt");
    const length = await User.find(query).countDocuments();

    return res
      .status(200)
      .json({ users, hasNextPage: users.length === limit, length });
  })
);

router.patch(
  "/:username/comment",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const username = req.params.username;
    const { comment } = req.body;
    if (typeof comment !== "string") throw "comment must be a string";
    const user = await User.findOneAndUpdate(
      { username },
      { comment },
      { new: true }
    ).select("comment");
    if (!user) throw "user not found";
    return res.status(200).json({ comment: user.comment });
  })
);

router.patch(
  "/:userId",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const userId = req.params.userId;
    const { displayName, notified, status, role, pictureUrl } = req.body.user;
    const user = await User.findByIdAndUpdate(
      userId,
      { displayName, notified, status, role, pictureUrl },
      { new: true }
    ).select("comment");
    if (!user) throw "user not found";
    return res.status(200).json({ comment: user.comment });
  })
);

router.patch(
  "/:username/linepay",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const username = req.params.username;
    const { linepay } = req.body;
    const user = await User.findOneAndUpdate(
      { username },
      { linepay },
      { new: true }
    );
    if (!user) throw "user not found";
    return res.status(200).json({ user });
  })
);

router.patch(
  "/:userId/approve",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findByIdAndUpdate(userId, { status: "approved" });
    if (!user) throw "user not found";
    notifyUser(user.username, `您的帳號被核准了! 團購連結: ${FRONTEND_URL}`);
    return res.status(200).json({});
  })
);

export default router;
