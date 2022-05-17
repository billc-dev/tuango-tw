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

router.get(
  "/post/postNum/:postNum",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const { postNum } = req.params;
    const post = await Post.findOne({ postNum, status: { $ne: "canceled" } });
    return res.status(200).json({ post });
  })
);

router.get(
  "/:postId/items",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const post = await Post.findById(req.params.postId).select("items");
    if (!post) throw "post not found";
    return res.status(200).json({ items: post.items });
  })
);

router.get(
  "/checkDuplicatePostNum/:postNum",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const post = await Post.findOne({
      postNum: req.params.postNum,
      status: { $ne: "canceled" },
    });
    return res.status(200).json({ isDuplicate: !!post });
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
      .sort("-postNum -createdAt")
      .select("-imageUrls -body -items");
    const length = await Post.find(query).countDocuments();

    return res
      .status(200)
      .json({ posts, hasNextPage: posts.length === limit, length });
  })
);

router.post(
  "/post",
  isAdmin,
  asyncWrapper(async (req, res) => {
    if (!req.body.postForm) throw "postForm is required";
    if (!req.body.user) throw "user is required";
    if (!req.body.postNum) throw "postNum is required";

    const postForm = await postService.validatePost(req.body.postForm);

    const duplicatePost = await Post.findOne({
      postNum: req.body.postNum,
      status: { $ne: "canceled" },
    });
    if (duplicatePost) throw "duplicate post number";

    const post = await postService.createPost(
      postForm,
      req.body.user,
      req.body.postNum
    );
    return res.status(200).json({ post });
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
