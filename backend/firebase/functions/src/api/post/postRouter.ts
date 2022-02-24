import * as express from "express";
import asyncWrapper from "../../middleware/asyncWrapper";
import { verifyJWT } from "../../utils/jwt";
import { Query } from "./post";
import { Post } from "./postDB";
import * as postService from "./postService";

const router = express.Router();

router.get(
  "/paginate/:cursor",
  asyncWrapper(async (req, res) => {
    const cursor = req.params.cursor;
    const limit = Number(req.query.limit);
    const query = req.query.query && JSON.parse(req.query.query as string);

    if (isNaN(limit)) throw "limit must be a number";
    if (limit <= 0) throw "limit must be greater than 0";

    let filter: { status: string; postNum?: object } = { status: "open" };
    if (cursor && cursor !== "initial") filter.postNum = { $lt: cursor };

    const postQuery = Post.find(filter).sort("-postNum").limit(limit);
    if (req.headers.type === "postCards") {
      postQuery.select({
        postNum: 1,
        title: 1,
        displayName: 1,
        imageUrls: 1,
        items: 1,
        orderCount: 1,
        status: 1,
      });
    }

    if (query) {
      const conditions = postService.getQueryConditions(query as Query);
      postQuery.find(conditions);
    }

    const posts = await postQuery;
    const hasMore = posts.length === limit;
    return res.status(200).json({ posts, hasMore });
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
    // if (!aid) query.select("-orderCount");
    // query.select("-body");
    const post = await query;
    return res.status(200).json({ post });
  })
);

export default router;
