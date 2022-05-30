import { Request } from "express";

import { notifyUser } from "api/notify/notifyService";
import { IOrder, SingleOrder } from "api/order/order";
import * as orderService from "api/order/orderService";
import { IPost } from "api/post/post";
import { FRONTEND_URL } from "utils/url";

import {
  DeliverItemsAndSums,
  DeliverQuery,
  DeliverSums,
  IDeliver,
} from "./deliver";
import Deliver from "./deliverDB";

export const createDeliver = async (post: IPost, sums: DeliverItemsAndSums) => {
  const { userId, displayName, postNum, title, _id } = post;
  const { normalItems, extraItems, normalItemSum, extraItemSum } = sums;
  const deliver = new Deliver({
    userId,
    displayName,
    postId: _id,
    postNum,
    title,
    normalOrders: normalItems,
    extraOrders: extraItems,
    normalTotal: normalItemSum,
    normalFee: normalItemSum - Math.round(normalItemSum * 0.94),
    extraTotal: extraItemSum,
    extraFee: extraItemSum - Math.round(extraItemSum * 0.9),
  });
  normalItems.filter((item) => item.qty > 0);
  if (
    normalItems.filter((item) => item.qty > 0).length > 0 ||
    extraItems.filter((item) => item.qty > 0).length > 0
  ) {
    await deliver.save();
  }
  return deliver;
};

export const getDeliverSums = (
  post: IPost,
  orders: IOrder[]
): DeliverItemsAndSums => {
  const normalItems = post.items.map((item) => ({
    ...item,
    qty: 0,
    amount: 0,
  }));
  const extraItems = post.items.map((item) => ({ ...item, qty: 0, amount: 0 }));
  const totalItems = post.items.map((item) => ({ ...item, qty: 0, amount: 0 }));
  for (const order of orders) {
    for (const item of order.order) {
      if (item.status !== "delivered") continue;
      if (order.userId !== "extra") {
        const index = normalItems.findIndex((i) => i.id === item.id);
        if (index === -1) continue;
        normalItems[index].qty += Number(item.qty);
        normalItems[index].amount += Number(item.qty * item.price);
      } else {
        const index = extraItems.findIndex((i) => i.id === item.id);
        if (index === -1) continue;
        extraItems[index].qty += Number(item.qty);
        extraItems[index].amount += Number(item.qty * item.price);
      }
      const index = totalItems.findIndex((i) => i.id === item.id);
      if (index === -1) continue;
      totalItems[index].qty += Number(item.qty);
      totalItems[index].amount += Number(item.qty * item.price);
    }
  }
  const normalItemSum = normalItems.reduce((sum, item) => sum + item.amount, 0);
  const extraItemSum = extraItems.reduce((sum, item) => sum + item.amount, 0);
  const totalItemSum = totalItems.reduce((sum, item) => sum + item.amount, 0);
  return {
    normalItems,
    extraItems,
    totalItems,
    normalItemSum,
    extraItemSum,
    totalItemSum,
  };
};

export const checkDeliverSums = (
  sums: DeliverSums,
  deliverSums: DeliverSums
) => {
  const { normalItemSum, extraItemSum, totalItemSum } = deliverSums;

  if (sums.normalItemSum !== normalItemSum) throw "normalItemSum not match";
  if (sums.extraItemSum !== extraItemSum) throw "extraItemSum not match";
  if (sums.totalItemSum !== totalItemSum) throw "totalItemSum not match";
};

export const sendMessageToDeliveredOrders = async (orders: IOrder[]) => {
  for (const order of orders) {
    const categories = orderService.categorizeOrders(order.order);
    if (!categories.delivered?.length) continue;
    const message = getDeliveredMessage(order, categories.delivered);
    notifyUser(order.userId, message);
  }
};

const getDeliveredMessage = (order: IOrder, orderItems: SingleOrder[]) => {
  let message = `🛒#${order.postNum} ${order.title} #${order.sellerDisplayName}\n`;
  let total = 0;
  for (const item of orderItems) {
    message += `➡️${item.id}.${item.item}+${item.qty} $${
      item.price * item.qty
    }\n`;
    total += Number(item.price) * Number(item.qty);
  }
  message += `小計$${total}\n`;
  if (order.comment) message += `備註: ${order.comment}`;
  message += `已到貨連結: ${FRONTEND_URL}/orders/delivered`;
  return message;
};

export const getParams = (req: Request) => {
  const cursor = req.params.cursor;
  const limit = Math.min(Number(req.query.limit), 100);
  const query: DeliverQuery | undefined =
    req.query.query && JSON.parse(req.query.query as string);
  return { cursor, limit, query };
};

export const getNextId = (delivers: IDeliver[]) => {
  const lastIndex = delivers.length - 1;
  if (delivers[lastIndex]) return delivers[lastIndex].createdAt;
  return undefined;
};
