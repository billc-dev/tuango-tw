import * as express from "express";

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

export default router;
