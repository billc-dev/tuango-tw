import * as express from "express";

import asyncWrapper from "middleware/asyncWrapper";
import { isAuthorized } from "middleware/auth";

import { notifyGroups } from "./notifyService";

const router = express.Router();

router.post(
  "/groups",
  isAuthorized,
  asyncWrapper(async (req, res) => {
    if (res.locals.user.role === "basic") throw "unauthorized";
    await notifyGroups(req.body.message);

    return res.json({ ok: true });
  })
);

export default router;
