import * as express from "express";
import asyncWrapper from "../../middleware/asyncWrapper";
import { isAuthorized } from "../../middleware/auth";
const router = express.Router();

router.get(
  "/",
  isAuthorized,
  asyncWrapper(async (_req, res) => {
    const user = res.locals.user;
    return res.status(200).json({ user });
  })
);

export default router;
