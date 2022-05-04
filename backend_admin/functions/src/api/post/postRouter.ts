import * as express from "express";

import Order from "api/order/orderDB";
import asyncWrapper from "middleware/asyncWrapper";
import { isAdmin } from "middleware/auth";

import { ValidatedPost } from "./post";
import { Post } from "./postDB";
import * as postService from "./services";
import { parsePostQueryData } from "./services";

const router = express.Router();

router.get(
  "/:postId",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const post = await Post.findById(req.params.postId);
    return res.status(200).json({ post });
  })
);

router.post(
  "/",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const { limit, page, query } = parsePostQueryData(req.body);
    const posts = await Post.find(query)
      .skip(page * limit)
      .limit(limit)
      .sort("-postNum")
      .select("-imageUrls -body -items");
    const length = await Post.find(query).countDocuments();

    return res
      .status(200)
      .json({ posts, hasNextPage: posts.length === limit, length });
  })
);

router.patch(
  "/:postId",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const postId = req.params.postId;
    const postForm: ValidatedPost = await postService.validatePost(
      req.body.postForm
    );

    await postService.updatePost(postId, res.locals.user.username, postForm);

    return res.status(200).json();
  })
);

router.patch(
  "/:postId/status",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const postId = req.params.postId;
    if (!postId) throw "post id invalid";

    await postService.updatePostStatus(postId, req.body.status);
    if (req.body.status === "canceled") {
      await Order.updateMany(
        { postId, status: "ordered" },
        { status: "canceled" }
      );
    }

    return res.status(200).json();
  })
);

router.patch(
  "/:postId/delivered",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const postId = req.params.postId;
    if (!postId) throw "post id invalid";

    await postService.updatePostDelivered(postId, req.body.delivered);

    return res.status(200).json();
  })
);

export default router;
