import * as express from "express";
import asyncWrapper from "../../middleware/asyncWrapper";
import { isAuthorized } from "../../middleware/auth";
import { verifyJWT } from "../../utils/jwt";
import { Like } from "../like/likeDB";
import { Filter, Query } from "./post";
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
      postQuery.select(postService.postCards);
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
      postQuery.select(postService.postCards);
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
  "/post/:id",
  asyncWrapper(async (req, res) => {
    const aid = req.cookies.aid;
    const id = req.params.id;

    if (aid) verifyJWT(aid);
    if (!id) throw "post id invalid";

    const query = Post.findById(id);
    const post = await query;
    return res.status(200).json({ post });
  })
);

export default router;
