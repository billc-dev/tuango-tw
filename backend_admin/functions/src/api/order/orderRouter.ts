import * as express from "express";

import * as completeService from "api/complete/completeService";
import { Post } from "api/post";
import { User } from "api/user/userDB";
import asyncWrapper from "middleware/asyncWrapper";
import { isAdmin } from "middleware/auth";

import { IOrder, OrderStatus } from "./order";
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

interface FilterQuery {
  userId?: string;
  status?: OrderStatus;
  postNum?: number;
  $or?: { [key: string]: RegExp }[];
}

router.post(
  "/",
  isAdmin,
  asyncWrapper(async (req, res) => {
    const { userId, status, text, postNum } = req.body;
    const filter: FilterQuery = {};
    if (userId) filter.userId = userId;
    if (status) filter.status = status;
    if (postNum) filter.postNum = postNum;
    if (text) {
      const regExp = new RegExp(text, "i");
      filter.$or = [
        { title: regExp },
        { sellerDisplayName: regExp },
        { "order.item": regExp },
      ];
    }
    const sortBy = req.body.sortBy || "-createdAt";

    const orders = await Order.find(filter)
      .sort(sortBy)
      .select("-orderHistory");
    return res.status(200).json({ orders });
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

export default router;
