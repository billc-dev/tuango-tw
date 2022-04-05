import * as express from "express";

import { Message } from "api/message/messageDB";
import { User } from "api/user/userDB";
import asyncWrapper from "middleware/asyncWrapper";
import { isAuthorized } from "middleware/auth";

import { Room } from "./roomDB";

const router = express.Router();

router.get(
  "/list",
  isAuthorized,
  asyncWrapper(async (req, res) => {
    const rooms = await Room.find({
      "users.user": { $in: [res.locals.user._id] },
      hasMessage: true,
    })
      .populate("users.user", "displayName pictureUrl role username")
      .sort({ lastCreatedAt: -1 });

    const roomNotifications = await Room.find({
      "users.user": res.locals.user._id,
      "users.notifications": { $gte: 1 },
      hasMessage: true,
    }).select("users");
    let messageCount = 0;
    roomNotifications.forEach((room: any) => {
      const index = room.users.findIndex(
        (u: any) => u.user.toString() === res.locals.user._id.toString()
      );
      if (index !== -1) messageCount += room.users[index].notifications;
    });
    return res.status(200).json({ rooms, messageCount });
  })
);

interface Query {
  _id?: string;
  "users.user"?: { $all?: string[] };
}

router.get(
  "/room",
  isAuthorized,
  asyncWrapper(async (req, res) => {
    const { userId } = req.query;
    if (!userId) throw "userId is required";

    const query: Query = {};
    if (userId === res.locals.user._id.toString()) throw "userId is invalid";
    query["users.user"] = { $all: [userId, res.locals.user._id] };

    if (Object.keys(query).length === 0) throw "invalid room query";

    const room = await Room.findOne(query).populate(
      "users.user",
      "displayName pictureUrl role username"
    );

    if (room) {
      const messages = await Message.find({ roomId: room._id })
        .sort({ createdAt: -1 })
        .populate("order")
        .populate("post")
        .limit(20);
      return res.json({ room, messages });
    } else {
      const user = await User.findById(userId);
      if (user && user._id.toString() !== res.locals.user._id.toString()) {
        const newRoom = new Room({
          users: [
            { user: user._id, notifiedAt: new Date().toISOString() },
            { user: res.locals.user._id, notifiedAt: new Date().toISOString() },
          ],
        });
        await newRoom.save();
        const populatedRoom = await Room.populate(newRoom, "users.user");
        return res.json({ room: populatedRoom, messages: [] });
      } else throw "cannot create room";
    }
  })
);

router.patch(
  "/room/notifications/reset",
  isAuthorized,
  asyncWrapper(async (req, res) => {
    const { roomId } = req.body;

    await Room.updateOne(
      { _id: roomId, "users.user": res.locals.user._id },
      { $set: { "users.$.notifications": 0 } }
    );

    return res.json({});
  })
);

export default router;
