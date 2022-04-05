import * as express from "express";

import { Room } from "api/room/roomDB";
import * as roomService from "api/room/roomService";
import asyncWrapper from "middleware/asyncWrapper";
import { isAuthorized } from "middleware/auth";

import { Message } from "./messageDB";
import { notifyUserForNewMessage, parseMessageType } from "./messageService";

const router = express.Router();

router.get(
  "/",
  isAuthorized,
  asyncWrapper(async (req, res) => {
    const { roomId, createdAt } = req.query;
    if (!roomId || !createdAt) throw "params missing";

    const limit = 15;

    const messages = await Message.find({
      roomId,
      createdAt: { $lt: createdAt },
    })
      .populate("order")
      .populate("post")
      .sort({ createdAt: -1 })
      .limit(limit);

    const hasMore = messages.length === limit;

    return res.status(200).json({ messages: messages.reverse(), hasMore });
  })
);
router.get(
  "/newMessages",
  isAuthorized,
  asyncWrapper(async (req, res) => {
    const { roomId, createdAt } = req.query;
    if (!roomId || !createdAt) throw "params missing";

    const messages = await Message.find({
      roomId,
      createdAt: { $gte: createdAt },
    })
      .populate("order")
      .populate("post")
      .sort({ createdAt: -1 });

    return res.status(200).json({ messages: messages.reverse() });
  })
);

router.post(
  "/message/send",
  isAuthorized,
  asyncWrapper(async (req, res) => {
    const { roomId, payload } = req.body;
    const type = parseMessageType(req.body.type);

    const room = await Room.findById(roomId);
    if (!room) throw "room not found";

    const read = room.users.map((user) => ({
      userId: user.user,
      read: user.user.toString() === res.locals.user._id.toString(),
    }));

    const newMessage = new Message({
      userId: res.locals.user._id,
      roomId,
      read,
      type,
      [type]: payload,
    });
    await newMessage.save();

    const message = await Message.findById(newMessage._id)
      .populate("order")
      .populate("post");

    const otherUser = room.users.find(
      (u) => u.user.toString() !== res.locals.user._id.toString()
    );

    if (otherUser && message) {
      await roomService.updateRoomLastMessage(message, room, otherUser);
      if (typeof otherUser.user === "string") return;
      await notifyUserForNewMessage(otherUser.user._id);
    }

    return res.status(200).json({ message });
  })
);

router.patch(
  "/message/read",
  isAuthorized,
  asyncWrapper(async (req, res) => {
    const { roomId, createdAt } = req.body;
    if (!roomId || !createdAt) throw "params missing";

    await Message.updateMany(
      {
        roomId: roomId,
        createdAt: { $lte: createdAt },
        read: { $elemMatch: { userId: res.locals.user._id, read: false } },
        "read.userId": res.locals.user._id,
      },
      {
        $set: { "read.$.read": true },
        updatedAt: new Date().toISOString(),
      }
    );

    return res.status(200).json({ ok: true });
  })
);

export default router;
