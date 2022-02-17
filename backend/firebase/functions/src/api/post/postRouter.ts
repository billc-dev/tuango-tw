import * as express from "express";
import asyncWrapper from "../../middleware/asyncWrapper";
import { verifyJWT } from "../../utils/jwt";
import { Post } from "./postDB";

const router = express.Router();

router.get(
  "/paginate/:cursor",
  asyncWrapper(async (req, res) => {
    const cursor = req.params.cursor;
    let filter: { status: string; postNum?: object } = { status: "open" };
    if (cursor && cursor !== "initial") {
      filter.postNum = { $lt: cursor };
    }
    const query = Post.find(filter).sort("-postNum").limit(16);
    if (req.headers.type === "postCards") {
      query.select({
        postNum: 1,
        title: 1,
        displayName: 1,
        imageUrls: 1,
        items: 1,
        orderCount: 1,
      });
    }

    const posts = await query;
    return res.status(200).json({ posts });
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
