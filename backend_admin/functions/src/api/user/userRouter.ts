import * as express from "express";

import asyncWrapper from "middleware/asyncWrapper";
import { isAdmin } from "middleware/auth";

import { User } from "./userDB";

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

export default router;
