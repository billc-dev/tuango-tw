import * as express from "express";

import { Like } from "api/like/likeDB";
import { notifyDeliveredPostCount } from "api/notify/notifyService";
import Order from "api/order/orderDB";
import asyncWrapper from "middleware/asyncWrapper";
import { isAuthorized } from "middleware/auth";

import { Filter, Query, ValidatedPost } from "./post";
import { Post } from "./postDB";
import * as postService from "./postService";

const router = express.Router();

router.get(
  "/paginate/:cursor",
  asyncWrapper(async (req, res) => {
    const { cursor, limit, query } = postService.getParams(req);
    postService.checkLimit(limit);

    let filter: Filter = { status: "open" };
    if (cursor && cursor !== "initial") filter.postNum = { $lt: cursor };

    const postQuery = Post.find(filter).sort("-postNum").limit(limit);
    if (req.headers.type === "postCards") {
      postQuery.select(postService.postCardsSelect);
    }

    if (query) {
      const conditions = postService.getQueryConditions(query as Query);
      postQuery.find(conditions);
    }

    const posts = await postQuery;
    const hasMore = posts.length === limit;

    return res
      .status(200)
      .json({ posts, hasMore, nextId: postService.getPostsNextId(posts) });
  })
);

router.get(
  "/liked/paginate/:cursor",
  isAuthorized,
  asyncWrapper(async (req, res) => {
    const { cursor, limit } = postService.getParams(req);
    postService.checkLimit(limit);

    const likeFilter: any = {};
    if (cursor && cursor !== "initial") likeFilter.createdAt = { $lt: cursor };
    console.log(cursor);

    const likes = await Like.find({ userId: res.locals.user.username })
      .limit(limit)
      .sort("-createdAt");
    const likesId = likes.map((like) => like.postId);
    if (likesId.length === 0)
      return res
        .status(200)
        .json({ hasMore: false, posts: [], nextId: undefined });

    const postQuery = Post.find({ _id: { $in: likesId } });

    if (req.headers.type === "postCards") {
      postQuery.select(postService.postCardsSelect);
    }

    const posts = await postQuery;

    let canceledPosts = 0;
    const filteredPost = posts.filter((post) => {
      const canceled = post.status === "canceled";
      if (canceled) canceledPosts++;
      return !canceled;
    });
    const hasMore = filteredPost.length === limit - canceledPosts;

    return res.status(200).json({
      hasMore,
      posts: filteredPost,
      nextId: likes[likes.length - 1].createdAt,
    });
  })
);

router.get(
  "/seller/paginate/:cursor",
  isAuthorized,
  asyncWrapper(async (req, res) => {
    const { cursor, limit, query } = postService.getParams(req);
    postService.checkLimit(limit);

    let filter: Filter = postService.getQueryStatus(query?.status);
    filter.userId = res.locals.user.username;
    if (cursor && cursor !== "initial") filter.postNum = { $lt: cursor };
    if (query?.title) filter.title = new RegExp(query.title, "i");
    if (query?.postNum) filter.postNum = query.postNum;

    const posts = await Post.find(filter)
      .sort("-postNum")
      .select("-normalTotal -extraTotal -normalFee -extraFee -deliverImages")
      .limit(limit);

    if (query?.status === "closed") {
      const postIds = posts.map((post) => post._id);
      const orders = await Order.find({
        status: "ordered",
        postId: { $in: postIds },
        orderNum: { $ne: 0 },
      }).select("_id postId orderNum status order");
      const ordersPostId = orders.map((order) => order.postId);
      const filteredPosts = posts.filter((post) =>
        ordersPostId.includes(String(post._id))
      );
      return res.status(200).json({
        posts: filteredPosts,
        hasMore: posts.length > 0,
        nextId: postService.getPostsNextId(posts),
      });
    }

    const hasMore = posts.length === limit;

    return res
      .status(200)
      .json({ posts, hasMore, nextId: postService.getPostsNextId(posts) });
  })
);

router.get(
  "/post/:id",
  asyncWrapper(async (req, res) => {
    const id = req.params.id;
    if (!id) throw "post id invalid";

    const post = await Post.findOne({ _id: id, status: { $ne: "canceled" } });
    return res.status(200).json({ post });
  })
);

router.get(
  "/check",
  isAuthorized,
  asyncWrapper(async (req, res) => {
    if (res.locals.user.role === "admin")
      return res.status(200).json({ created: false });

    let date: string | Date = new Date().toISOString();
    if (Number(date.slice(11, 13)) < 16) {
      date = new Date();
      date.setDate(date.getDate() - 1);
      date = date.toISOString().slice(0, 11) + "16:00:00.000Z";
    } else date = date.slice(0, 11) + "16:00:00.000Z";

    const posts = await Post.find({
      status: "open",
      createdAt: { $gte: date },
      userId: res.locals.user.username,
    });

    const created = posts.length >= 2;

    return res.status(200).json({ created });
  })
);

router.post(
  "/post",
  isAuthorized,
  asyncWrapper(async (req, res) => {
    const postForm = await postService.validatePost(req.body.postForm);
    const prevPost = await postService.findPrevPost();
    if (!prevPost) throw "previous post not found";

    const post = await postService.createPost(
      postForm,
      res.locals.user,
      prevPost.postNum
    );

    await postService.sendGroupMessage(post);

    return res.status(200).json({ post });
  })
);

router.patch(
  "/post/:postId",
  isAuthorized,
  asyncWrapper(async (req, res) => {
    const postId = req.params.postId;
    const postForm: ValidatedPost = await postService.validatePost(
      req.body.postForm
    );

    const post = await postService.updatePost(
      postId,
      res.locals.user.username,
      postForm
    );
    if (post) {
      await notifyDeliveredPostCount(post.deliveryDate);
    }

    if (!post) throw "post not found";

    return res.status(200).json({ post });
  })
);

router.patch(
  "/post/:postId/close",
  isAuthorized,
  asyncWrapper(async (req, res) => {
    const postId = req.params.postId;

    const post = await postService.closePost(postId, res.locals.user.username);

    if (!post) throw "post not found";

    return res.status(200).json({ post });
  })
);

router.delete(
  "/post/:postId",
  isAuthorized,
  asyncWrapper(async (req, res) => {
    const postId = req.params.postId;

    const post = await postService.deletePost(postId, res.locals.user.username);

    if (!post) throw "post not found";

    if (post.userId === res.locals.user.username) {
      await postService.cancelOrders(postId);
    }

    return res.status(200).json({});
  })
);

export default router;
