import * as express from "express";
import asyncWrapper from "../../middleware/asyncWrapper";
import { isAuthorized } from "../../middleware/auth";
import { Like } from "./likeDB";
import * as postService from "../post/postService";

const router = express.Router();

router.get(
  "/",
  isAuthorized,
  asyncWrapper(async (req, res) => {
    const likes = await Like.find({ userId: res.locals.user.username }).sort({
      createdAt: -1,
    });
    return res.status(200).json({ likes });
  })
);

router.post(
  "/post/:postId",
  isAuthorized,
  asyncWrapper(async (req, res) => {
    const { postId } = req.params;
    if (!postId) throw "postId missing";

    const like = new Like({
      postId: req.params.postId,
      userId: res.locals.user.username,
    });
    await like.save();

    const post = await postService.incrementLikeCount(1, req.params.postId);

    return res.status(200).json({ like, post });
  })
);

router.delete(
  "/post/:postId",
  isAuthorized,
  asyncWrapper(async (req, res) => {
    const { postId } = req.params;
    if (!postId) throw "postId missing";

    await Like.deleteOne({ postId, userId: res.locals.user.username });

    const post = await postService.incrementLikeCount(-1, req.params.postId);

    return res.status(200).json({ post });
  })
);

export default router;
