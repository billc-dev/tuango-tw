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
