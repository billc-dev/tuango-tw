import * as express from "express";

import Complete from "api/complete/completeDB";
import { notifyUser } from "api/notify/notifyService";
import { Post } from "api/post";
import * as postService from "api/post/postService";
import asyncWrapper from "middleware/asyncWrapper";
import { isAuthorized } from "middleware/auth";

import Order from "./orderDB";
import * as orderService from "./orderService";

const router = express.Router();

router.get(
  "/post/:id",
  asyncWrapper(async (req, res) => {
    const postId = req.params.id;
    if (!postId) throw "post id invalid";
    const orders = await Order.find({
      postId,
      status: { $ne: "canceled" },
      orderNum: { $ne: 0 },
      ...(req.query?.status && { status: req.query.status }),
    }).sort({ orderNum: 1 });
    return res.status(200).json({ orders });
  })
);

router.put(
  "/order",
  isAuthorized,
  asyncWrapper(async (req, res) => {
    const orderForm = await orderService.validateOrderForm(req.body.orderForm);

    const post = await Post.findById(orderForm.postId);
    if (!post) throw "post not found";
    if (post.status !== "open") throw "cannot order, post is not open";

    const over = orderService.isOverItemQty(post.items, orderForm);
    if (over) return res.json({ error: "剩餘數量已更新! 請重新下單!", post });

    const order = await orderService.createNewOrder(
      post,
      orderForm,
      res.locals.user
    );
    const updatedPost = await postService.decrementItemQty(orderForm, post);

    if (order.comment) {
      const message = `
🦓 ${order.displayName} 在#${order.postNum} ${order.title} 下單並備註 ⚠️ : ${order.comment}
貼文連結: www.開心團購.com/posts?postId=${order.postId}`;
      notifyUser(post.userId, message);
    }

    return res.status(200).json({ post: updatedPost, order });
  })
);

router.delete(
  "/order",
  isAuthorized,
  asyncWrapper(async (req, res) => {
    const order = await Order.findById(req.body.orderId);
    if (!order) throw "order not found";
    if (order.userId !== res.locals.user.username) throw "unauthorized";
    if (order.status !== "ordered") throw "order status cannot be changed";

    const post = await Post.findById(order.postId);
    if (!post) throw "post not found";
    if (post.status !== "open") throw "post status not open";

    await orderService.cancelOrder(order);

    const updatedPost = await postService.incrementItemQty(order, post);

    return res.status(200).json({ post: updatedPost });
  })
);

router.get(
  "/user-orders/normal/paginate/:cursor",
  isAuthorized,
  asyncWrapper(async (req, res) => {
    const cursor = req.params.cursor;
    const limit = Number(req.query.limit);
    const status = req.query.status;

    const createdAtCursor =
      cursor === "initial" ? {} : { createdAt: { $lt: cursor } };

    const orders = await Order.find({
      userId: res.locals.user.username,
      status,
      ...createdAtCursor,
    })
      .sort("-createdAt")
      .limit(limit);

    if (orders.length === 0)
      return res.status(200).json({ orders: [], nextId: undefined });

    const nextId =
      orders.length === limit ? orders[orders.length - 1].createdAt : undefined;

    return res.status(200).json({ orders, nextId });
  })
);

router.get(
  "/user-orders/completed/paginate/:cursor",
  isAuthorized,
  asyncWrapper(async (req, res) => {
    const cursor = req.params.cursor;
    const limit = Number(req.query.limit);

    const createdAtCursor =
      cursor === "initial" ? {} : { createdAt: { $lt: cursor } };

    const completes = await Complete.find({
      userId: res.locals.user.username,
      ...createdAtCursor,
    })
      .sort("-createdAt")
      .limit(limit);

    if (completes.length === 0)
      return res.status(200).json({ completes: [], nextId: undefined });

    const nextId =
      completes.length === limit
        ? completes[completes.length - 1].createdAt
        : undefined;

    return res.status(200).json({ completes, nextId });
  })
);

router.get(
  "/extra/paginate/:cursor",
  asyncWrapper(async (req, res) => {
    const cursor = req.params.cursor;
    const limit = Number(req.query.limit);

    const postNumCursor =
      cursor === "initial" ? {} : { postNum: { $lt: cursor } };

    const orders = await Order.find({
      userId: "extra",
      status: "delivered",
      ...postNumCursor,
    })
      .sort("-postNum")
      .limit(limit);

    if (orders.length === 0)
      return res.status(200).json({ orders: [], nextId: undefined });

    const nextId =
      orders.length === limit ? orders[orders.length - 1].postNum : undefined;

    return res.status(200).json({ orders, nextId });
  })
);

router.patch(
  "/order/setHasName",
  isAuthorized,
  asyncWrapper(async (req, res) => {
    const { orderId, hasName } = req.body;
    if (!orderId) throw "orderId is required";
    if (typeof hasName === "undefined") throw "hasName is required";

    const order = await Order.findByIdAndUpdate(
      orderId,
      { hasName },
      { new: true }
    );
    return res.status(200).json({ order });
  })
);

router.get(
  "/complete/:id",
  isAuthorized,
  asyncWrapper(async (req, res) => {
    const completeId = req.params.id;
    if (!completeId) throw "complete id invalid";

    const complete = await Complete.findById(completeId);
    if (!complete) throw "complete not found";

    const isCompleteUser = complete.userId === res.locals.user.username;
    const isAdmin = res.locals.user.role === "admin";
    if (!isCompleteUser && !isAdmin) throw "unauthorized";

    return res.status(200).json({ complete });
  })
);

export default router;
