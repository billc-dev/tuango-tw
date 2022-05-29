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
  "/date/:date",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const posts = await Post.find({ deliveryDate: req.params.date })
      .sort({ displayName: -1, postNum: -1 })
      .select("postNum title displayName");

    const postIds = posts.map((post) => post._id);
    const orderPostNums = await Order.find({
      postId: { $in: postIds },
      status: "ordered",
    }).distinct("postNum");
    const returnedPosts = posts.filter((post) => {
      const index = orderPostNums.findIndex(
        (postNum) => postNum === post.postNum
      );
      return index !== -1;
    });

    return res.json({ posts: returnedPosts });
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

router.get(
  "/:postId/items",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const post = await Post.findById(req.params.postId).select("items");
    if (!post) throw "post not found";
    return res.status(200).json({ items: post.items });
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
    const { user } = req.body;
    let postNum = req.body.postNum;

    if (!req.body.postForm) throw "postForm is required";
    if (!user) throw "user is required";

    const postForm = await postService.validatePost(req.body.postForm);

    if (postNum > 0) {
      const duplicatePost = await Post.findOne({
        postNum: req.body.postNum,
        status: { $ne: "canceled" },
      });
      if (duplicatePost) throw "duplicate post number";
    } else {
      const prevPost = await postService.findPrevPost();
      if (!prevPost) throw "previous post not found";
      postNum = prevPost.postNum + 1;
    }

    const post = await postService.createPost(
      postForm,
      req.body.user,
      postNum,
      req.body.fb
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

    await postService.updatePost(postId, postForm);

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
