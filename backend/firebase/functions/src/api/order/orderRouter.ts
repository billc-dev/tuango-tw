import * as express from "express";
import asyncWrapper from "../../middleware/asyncWrapper";
import { isAuthorized } from "../../middleware/auth";
import { Post } from "../post";
import * as postService from "../post/postService";
import { Order } from "./orderDB";
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

    const over = orderService.isOverItemQty(post.items, orderForm);
    if (over) return res.json({ error: "剩餘數量已更新! 請重新下單!", post });

    const order = await orderService.createNewOrder(
      post,
      orderForm,
      res.locals.user
    );
    const updatedPost = await postService.decrementItemQty(orderForm, post);

    return res.json({ post: updatedPost, order });
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

export default router;
