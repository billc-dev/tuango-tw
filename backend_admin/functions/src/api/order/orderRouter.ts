import * as express from "express";
import { FilterQuery } from "mongoose";

import * as completeService from "api/complete/completeService";
import {
  checkDeliverSums,
  createDeliver,
  getDeliverSums,
  sendMessageToDeliveredOrders,
} from "api/deliver/deliverService";
import { Post } from "api/post";
import * as postService from "api/post/services";
import { User } from "api/user/userDB";
import asyncWrapper from "middleware/asyncWrapper";
import { isAdmin } from "middleware/auth";

import { ILocationOrderItem, ILocationPostItem, IOrder } from "./order";
import Order from "./orderDB";
import * as orderService from "./orderService";

const router = express.Router();

router.get(
  "/delivered/user/:username",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const orders = await Order.find({
      status: "delivered",
      userId: req.params.username,
    }).sort("order.location");
    return res.status(200).json({ orders });
  })
);

router.get(
  "/ping",
  asyncWrapper(async (req, res) => {
    const order = await Order.findOne({});
    return res.status(200).json({ order });
  })
);

router.get(
  "/:orderId",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const order = await Order.findById(req.params.orderId);
    return res.status(200).json({ order });
  })
);

router.post(
  "/",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const { userId, status, text, postNum, FB, deliveredAt, storageType } =
      req.body;

    let sortBy = "-createdAt";

    const filter: FilterQuery<IOrder> = {};
    if (userId) filter.userId = userId;
    if (status) {
      filter.status = status;
      if (status === "delivered") {
        sortBy = "-deliveredAt";
      }
    }
    if (postNum) filter.postNum = postNum;
    if (deliveredAt) {
      if (status === "delivered") {
        filter.deliveredAt = { $lte: deliveredAt };
        sortBy = "-deliveredAt";
      }
    }
    if (text) {
      const regExp = new RegExp(text, "i");
      filter.$or = [
        { title: regExp },
        { sellerDisplayName: regExp },
        { "order.item": regExp },
      ];
    }
    if (FB) filter.displayName = new RegExp("FB", "i");
    if (storageType) {
      const posts = await Post.find({
        storageType,
        status: { $ne: "canceled" },
      }).select("_id");
      const postIds = posts.map((post) => post._id);
      filter.postId = { $in: postIds };
    }

    if (req.body.sortBy) sortBy = req.body.sortBy;

    const orders = await Order.find(filter)
      .sort(sortBy)
      .select("-orderHistory");

    return res.status(200).json({ orders });
  })
);

router.post(
  "/create",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const { userId, postId, orderItems } = req.body;
    if (!userId || !postId || !orderItems)
      throw "userId or orderItems is missing";

    const user = await User.findById(userId);
    if (!user) throw "user not found";
    const post = await Post.findById(postId);
    if (!post) throw "post not found";

    const order = await orderService.createOrderedOrder(user, post, orderItems);
    if (order && order.userId !== "extra") {
      await postService.incrementPostOrderCount(post._id, 1);
    }
    return res.status(200).json({ order });
  })
);

router.post(
  "/paginate",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const { limit, page, query } = orderService.parseOrderQueryData(req.body);
    const orders = await Order.find(query)
      .skip(page * limit)
      .limit(limit)
      .sort("-_id")
      .select("-orderHistory");

    const length = await Order.find(query).countDocuments();

    return res
      .status(200)
      .json({ orders, hasNextPage: orders.length === limit, length });
  })
);

router.post(
  "/order/delivered",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const { postId, username, orderItems, comment } = req.body;
    if (!orderItems || !username) throw "orderItems or username is missing";
    const user = await User.findOne({ username });
    if (!user) throw "user not found";
    const post = await Post.findById(postId);
    if (!post) throw "post not found";
    const order = await orderService.createDeliveredOrder(
      post,
      orderItems,
      user,
      comment
    );
    await orderService.sendDeliveredMessage(order);
    return res.status(200).json({ order });
  })
);

router.post(
  "/order/delivered/extra",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const { username, orderId, orderItems, comment } = req.body;
    if (!orderId || !orderItems || !username)
      throw "orderItems or username is missing";
    const user = await User.findOne({ username });
    if (!user) throw "user not found";
    const order = await Order.findById(orderId).lean();
    if (!order) throw "order not found";
    await orderService.checkQuantity(order, orderItems);
    const newOrder = await orderService.createExtraOrderAndUpdate(
      order,
      orderItems,
      user,
      comment
    );
    await orderService.sendDeliveredMessage(newOrder);
    return res.status(200).json({ order: newOrder });
  })
);

router.post(
  "/post/:postId",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const postId = req.params.postId;
    const { status } = req.body;
    if (!postId) throw "postId is missing";

    const filter: FilterQuery<IOrder> = {
      postId,
      status: { $ne: "canceled" },
    };
    if (status) filter.status = status;

    const orders = await Order.find(filter).sort("orderNum");
    return res.status(200).json({ orders });
  })
);

router.post(
  "/location",
  asyncWrapper(async (req, res) => {
    const { filter, orderLocation } = orderService.getLocationQueryFilter(
      req.body.query
    );

    const orders = await Order.find({ status: "delivered", ...filter })
      .sort({ postNum: -1, orderNum: 1 })
      .select(
        "order displayName orderNum postId sellerDisplayName title postNum"
      );

    const posts = orderService.getLocationPosts(orders, orderLocation);

    return res.status(200).json({ posts });
  })
);

interface PatchLocationBody {
  postItems: ILocationPostItem[];
  orderItems: ILocationOrderItem[];
}

router.patch(
  "/location",
  asyncWrapper(async (req, res) => {
    const { postItems, orderItems }: PatchLocationBody = req.body;
    const promises = [];
    for (const orderItem of orderItems) {
      if (!orderItem.checked) continue;
      const index = postItems.findIndex((item) => item.id === orderItem.id);
      if (index === -1) continue;
      promises.push(
        Order.updateMany(
          { "order._id": orderItem._id },
          { $set: { "order.$.location": postItems[index].location } }
        )
      );
    }
    await Promise.all(promises);
    return res.status(200).json({ success: true });
  })
);

interface DeliverOrdersBody {
  orders: IOrder[];
  normalItemSum: number;
  extraItemSum: number;
  totalItemSum: number;
}

router.patch(
  "/deliver",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const { orders, ...sums }: DeliverOrdersBody = req.body;

    const post = await Post.findById(orders[0].postId).lean();
    if (!post) throw "post not found";

    const deliverSums = getDeliverSums(post, orders);
    checkDeliverSums(sums, deliverSums);

    if (orders.length <= 0) throw "orders is missing";
    const orderedOrders = await Order.find({
      postId: post._id,
      status: "ordered",
    }).select("postId status");

    const session = await Order.startSession();
    try {
      session.startTransaction();
      for (const order of orders as IOrder[]) {
        const index = orderedOrders.findIndex(
          (ord) => ord._id.toString() === order._id
        );
        if (index === -1) throw "refresh postOrders";

        const categories = orderService.categorizeOrders(order.order);
        const categoryCount = Object.keys(categories).length;
        if (categoryCount <= 0) throw "no orders to update";
        await orderService.updateOrders(session, order, categories);
      }
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }

    const deliver = await createDeliver(post, deliverSums);
    await postService.incrementPostSums(post._id, deliver);
    await sendMessageToDeliveredOrders(orders);

    return res.status(200).json({ deliver });
  })
);

interface CompleteOrdersBody {
  orders: IOrder[];
  linePay: boolean;
  sum: number;
}

router.patch(
  "/complete",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const { orders, linePay, sum }: CompleteOrdersBody = req.body;
    const total = orderService.getCompletedOrdersSum(orders);
    if (sum !== total) throw "total is not equal to sum";

    if (orders.length <= 0) throw "orders is missing";
    const deliveredOrders = await Order.find({
      userId: orders[0].userId,
      status: "delivered",
    }).select("userId status");

    const session = await Order.startSession();
    try {
      session.startTransaction();
      for (const order of orders as IOrder[]) {
        const index = deliveredOrders.findIndex(
          (ord) => ord._id.toString() === order._id
        );
        if (index === -1) throw "refresh pickupOrders";

        const categories = orderService.categorizeOrders(order.order);
        const categoryCount = Object.keys(categories).length;
        if (categoryCount <= 0) throw "no orders to update";
        await orderService.updateOrders(session, order, categories);
      }
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }

    const complete = await completeService.createComplete(
      orders,
      linePay,
      res.locals.user.displayName,
      total
    );

    await completeService.sendCompleteMessage(
      total,
      complete._id,
      orders[0].userId
    );

    return res.status(200).json({});
  })
);

router.patch(
  "/:orderId",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const { order } = req.body;
    if (!order) throw "order is missing";
    const session = await Order.startSession();
    try {
      session.startTransaction();
      const categories = orderService.categorizeOrders(order.order);
      const categoryCount = Object.keys(categories).length;
      if (categoryCount <= 0) throw "no orders to update";
      await orderService.updateOrders(session, order, categories);
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }

    return res.status(200).json({ order });
  })
);

export default router;
