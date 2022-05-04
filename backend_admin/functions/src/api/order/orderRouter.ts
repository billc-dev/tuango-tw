import * as express from "express";

import { Post } from "api/post";
import * as postService from "api/post/services";
import asyncWrapper from "middleware/asyncWrapper";
import { isAdmin } from "middleware/auth";

import Order from "./orderDB";
import * as orderService from "./orderService";

const router = express.Router();

router.get(
  "/post/:id",
  isAdmin,
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
  isAdmin,
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

    //     if (order.comment) {
    //       const message = `
    // 🦓 ${order.displayName} 在#${order.postNum} ${order.title} 下單並備註 ⚠️ : ${order.comment}
    // 貼文連結: www.開心團購.com/posts?postId=${order.postId}`;
    //       notifyUser(post.userId, message);
    //     }

    return res.status(200).json({ post: updatedPost, order });
  })
);

// router.patch(
//   "/:orderId",
//   isAdmin,
//   asyncWrapper(async (req, res) => {
//     const orderForm = await orderService.validateOrderForm(req.body.orderForm);

//     const post = await Post.findById(orderForm.postId);
//     if (!post) throw "post not found";
//     if (post.status !== "open") throw "cannot order, post is not open";

//     const over = orderService.isOverItemQty(post.items, orderForm);
//     if (over) return res.json({ error: "剩餘數量已更新! 請重新下單!", post });

//     const order = await orderService.createNewOrder(
//       post,
//       orderForm,
//       res.locals.user
//     );
//     const updatedPost = await postService.decrementItemQty(orderForm, post);

//     //     if (order.comment) {
//     //       const message = `
//     // 🦓 ${order.displayName} 在#${order.postNum} ${order.title} 下單並備註 ⚠️ : ${order.comment}
//     // 貼文連結: www.開心團購.com/posts?postId=${order.postId}`;
//     //       notifyUser(post.userId, message);
//     //     }

//     return res.status(200).json({ post: updatedPost, order });
//   })
// );

router.delete(
  "/order",
  isAdmin,
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

export default router;
