import * as express from "express";
import { FilterQuery } from "mongoose";

import { Post } from "api/post";
import asyncWrapper from "middleware/asyncWrapper";
import { isAdmin } from "middleware/auth";

import { IDeliver } from "./deliver";
import Deliver from "./deliverDB";
import * as deliverService from "./deliverService";

const router = express.Router();

router.get(
  "/paginate/:cursor",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const { cursor, limit, query } = deliverService.getParams(req);

    const filter: FilterQuery<IDeliver> = {};
    if (cursor && cursor !== "initial") filter.createdAt = { $lt: cursor };
    if (query?.userId) filter.userId = query.userId;

    const delivers = await Deliver.find(filter).sort("-createdAt").limit(limit);

    const hasMore = delivers.length === limit;

    return res.status(200).json({
      delivers,
      hasMore,
      nextId: deliverService.getNextId(delivers),
    });
  })
);

router.get(
  "/post/:postId",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const delivers = await Deliver.find({ postId: req.params.postId })
      .sort("-createdAt")
      .select("-orders");
    return res.status(200).json({ delivers });
  })
);

router.patch(
  "/:deliverId",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const { normalTotal, normalFee, extraTotal, extraFee } = req.body;

    const deliver = await Deliver.findByIdAndUpdate(req.params.deliverId, {
      normalTotal,
      normalFee,
      extraTotal,
      extraFee,
    });
    if (!deliver) throw "deliver not found";
    await Post.findByIdAndUpdate(
      deliver.postId,
      {
        $inc: {
          normalTotal: normalTotal - deliver.normalTotal,
          normalFee: normalFee - deliver.normalFee,
          extraTotal: extraTotal - deliver.extraTotal,
          extraFee: extraFee - deliver.extraFee,
        },
      },
      { new: true }
    );
    return res.status(200).json({ deliver });
  })
);

export default router;
