import * as express from "express";
import { FilterQuery } from "mongoose";

import { updatePostSums } from "api/post/services";
import { User } from "api/user/userDB";
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

router.get(
  "/stats/:startDate/:endDate",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const delivers = await Deliver.find({
      createdAt: { $gte: req.params.startDate, $lte: req.params.endDate },
    })
      .sort("_id")
      .select("-orders -normalOrders -extraOrders -displayName")
      .lean();
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
    await updatePostSums(
      deliver.postId,
      deliver,
      normalTotal,
      normalFee,
      extraTotal,
      extraFee
    );
    return res.status(200).json({ deliver });
  })
);

router.patch(
  "/deliverUserId/:userId",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const { deliverIds } = req.body;
    if (!Array.isArray(deliverIds)) throw "deliverIds is invalid";
    const user = await User.findOne({ username: req.params.userId });
    if (!user) throw "User not found";
    await Deliver.updateMany(
      { _id: { $in: deliverIds } },
      { userId: user.username, displayName: user.displayName }
    );
    return res.status(200).json({});
  })
);

export default router;
