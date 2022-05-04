import * as express from "express";

import { Post } from "api/post";
import asyncWrapper from "middleware/asyncWrapper";
import { isAdmin } from "middleware/auth";

import Deliver from "./deliverDB";

const router = express.Router();

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
