import * as express from "express";

import Order from "api/order/orderDB";
import { Post } from "api/post";
import { Room } from "api/room/roomDB";
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
  "/deliveredOrderCount",
  isAuthorized,
  asyncWrapper(async (req, res) => {
    const orderCount = await Order.countDocuments({
      userId: res.locals.user.username,
      status: "delivered",
    });
    return res.status(200).json({ orderCount });
  })
);

router.get(
  "/notificationCount",
  isAuthorized,
  asyncWrapper(async (_req, res) => {
    const rooms = await Room.find({
      "users.user": res.locals.user._id,
      "users.notifications": { $gte: 1 },
    }).select("users");

    let notificationCount = 0;
    rooms.forEach((room) => {
      const index = room.users.findIndex(
        (u) => u.user.toString() === res.locals.user._id.toString()
      );
      if (index !== -1) notificationCount += room.users[index].notifications;
    });
    return res.status(200).json({ notificationCount });
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
