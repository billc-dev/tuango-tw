import { Request } from "express";

import { notifyUser } from "api/notify/notifyService";
import { IOrder } from "api/order/order";
import { FRONTEND_URL } from "utils/url";

import { CompleteQuery, IComplete } from "./complete";
import Complete from "./completeDB";

export const createComplete = async (
  orders: IOrder[],
  linePay: boolean,
  admin: string,
  total: number
) => {
  const reducedOrders = orders.map((order) => {
    const completedOrders = order.order.filter((i) => i.status === "completed");
    return {
      ...order,
      orderId: order._id,
      order: completedOrders,
    };
  });

  const complete = new Complete({
    userId: orders[0].userId,
    displayName: orders[0].displayName,
    orders: reducedOrders,
    payment: { linePay },
    admin,
    total,
  });
  await complete.save();
  return complete;
};

export const sendCompleteMessage = async (
  total: number,
  completeId: string,
  userId: string
) => {
  const message = `
合計$${total} 取貨記錄連結: ${FRONTEND_URL}/orders/completed/${completeId}`;
  await notifyUser(userId, message);
};
export const getParams = (req: Request) => {
  const cursor = req.params.cursor;
  const limit = Math.min(Number(req.query.limit), 100);
  const query: CompleteQuery | undefined =
    req.query.query && JSON.parse(req.query.query as string);
  return { cursor, limit, query };
};

export const getCompletesNextId = (completes: IComplete[]) => {
  const lastIndex = completes.length - 1;
  if (completes[lastIndex]) return completes[lastIndex].createdAt;
  return undefined;
};
