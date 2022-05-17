import * as express from "express";

import asyncWrapper from "middleware/asyncWrapper";
import { isAdmin } from "middleware/auth";

import Complete from "./completeDB";
import * as completeService from "./completeService";

const router = express.Router();

export interface Filter {
  createdAt?: { $lt: string };
  userId?: string;
  "payment.linePay"?: boolean;
  "payment.confirmed"?: boolean;
}

router.get(
  "/paginate/:cursor",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const { cursor, limit, query } = completeService.getParams(req);

    const filter: Filter = {};
    if (cursor && cursor !== "initial") filter.createdAt = { $lt: cursor };
    if (query?.userId) filter.userId = query.userId;
    if (query?.unconfirmed) {
      filter["payment.linePay"] = true;
      filter["payment.confirmed"] = false;
    }
    const completes = await Complete.find({ ...query, ...filter })
      .sort("-createdAt")
      .limit(limit);

    const hasMore = completes.length === limit;

    return res.status(200).json({
      completes,
      hasMore,
      nextId: completeService.getCompletesNextId(completes),
    });
  })
);

router.patch(
  "/paymentMethod/:completeId",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const { completeId } = req.params;
    const { linePay } = req.body;
    if (!completeId) throw "completeId is missing";
    const complete = await Complete.findByIdAndUpdate(
      completeId,
      { "payment.linePay": linePay },
      { new: true }
    );
    return res.status(200).json({ complete });
  })
);

router.patch(
  "/confirmPayment/:completeId",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const { completeId } = req.params;
    const { confirmed } = req.body;
    if (!completeId) throw "completeId is missing";
    const complete = await Complete.findByIdAndUpdate(
      completeId,
      { "payment.confirmed": confirmed },
      { new: true }
    );
    return res.status(200).json({ complete });
  })
);

export default router;
