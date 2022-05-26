import * as express from "express";
import { FilterQuery } from "mongoose";

import Message from "api/message/messageDB";
import asyncWrapper from "middleware/asyncWrapper";
import { isAdmin } from "middleware/auth";

import { IMessage } from "./message";

const router = express.Router();

router.get(
  "/paginate/:cursor",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const cursor = req.params.cursor;
    const limit = Math.min(Number(req.query.limit), 100);

    const filter: FilterQuery<IMessage> = {};
    if (cursor && cursor !== "initial") filter.createdAt = { $lt: cursor };

    const messages = await Message.find().sort("-createdAt").limit(limit);
    const hasMore = messages.length === limit;
    let nextId = undefined;
    if (messages[messages.length - 1])
      nextId = messages[messages.length - 1].createdAt;

    return res.json({ messages, hasMore, nextId });
  })
);

export default router;
