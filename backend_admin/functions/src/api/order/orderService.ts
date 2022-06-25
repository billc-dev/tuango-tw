import { ClientSession } from "mongoose";

import { notifyUser } from "api/notify/notifyService";
import { IPost } from "api/post/post";
import { IUser } from "api/user/user";
import { getCurrentDate } from "utils/date";
import { FRONTEND_URL } from "utils/url";

import {
  CreateOrderItem,
  ILocationPost,
  IOrder,
  MongooseOrder,
  OrderLocationFilter,
  OrderQuery,
  OrderStatus,
  ParsedOrderQuery,
  SingleOrder,
} from "./order";
import Order from "./orderDB";
import { IOrderForm, orderFormSchema } from "./orderSchema";

export const validateOrderForm = (orderForm: IOrderForm) => {
  return orderFormSchema.validate(orderForm, {
    abortEarly: true,
    stripUnknown: true,
  });
};

export const createNewOrder = async (
  post: IPost,
  orderForm: IOrderForm,
  user: IUser
) => {
  const prevOrder = await Order.findOne({
    postId: post._id,
    status: { $ne: "canceled" },
  }).sort({ orderNum: -1 });

  const imageUrl = () => {
    const image = post.imageUrls[0];
    if (typeof image === "object" && image !== null) return image.sm;
    else return image;
  };

  const order = new Order({
    orderNum: prevOrder ? prevOrder.orderNum + 1 : 1,
    userId: user.username,
    displayName: user.displayName,
    sellerDisplayName: post.displayName,
    postNum: post.postNum,
    title: post.title,
    pictureUrl: user.pictureUrl,
    postId: post._id,
    imageUrl: imageUrl(),
    order: orderForm.items,
    comment: orderForm.comment,
    orderHistory: [{ status: "ordered" }],
    fb: user.fb,
  });

  await order.save();

  return order;
};

export const cancelOrder = async (order: MongooseOrder) => {
  order.status = "canceled";
  order.orderHistory.push({
    status: "canceled",
    createdAt: getCurrentDate(),
  });
  await order.save();
};

export const checkQuantity = async (
  order: IOrder,
  orderItems: CreateOrderItem[]
) => {
  for (const item of orderItems) {
    const index = order.order.findIndex((i) => i.id === item.id);
    if (index === -1) throw "item not found";
    const qty = order.order[index].qty;
    if (item.qty > qty) throw "item quantity is over";
  }
};

export const createExtraOrderAndUpdate = async (
  order: IOrder,
  orderItems: CreateOrderItem[],
  user: IUser,
  comment: string
) => {
  const { username, displayName } = user;
  const { sellerDisplayName, postId, postNum, title, pictureUrl, imageUrl } =
    order;
  const session = await Order.startSession();
  try {
    session.startTransaction();

    const newOrder = new Order({
      orderNum: 0,
      userId: username,
      displayName,
      sellerDisplayName,
      postId,
      postNum,
      title,
      pictureUrl,
      imageUrl,
      order: orderItems,
      status: "delivered",
      deliveredAt: new Date().toISOString(),
      orderHistory: [{ status: "delivered" }],
      comment,
      fb: user.fb,
    });
    await newOrder.save({ session });

    const updatedItems = order.order
      .map((item) => {
        const index = orderItems.findIndex((i) => i.id === item.id);
        if (index === -1) return item;
        return { ...item, qty: item.qty - orderItems[index].qty };
      })
      .filter((item) => item.qty > 0);

    await Order.updateOne(
      { _id: order._id },
      {
        order: updatedItems,
        ...(updatedItems.length === 0 && { status: "completed" }),
      },
      { session }
    );
    await session.commitTransaction();
    return newOrder;
  } catch (error) {
    await session.abortTransaction();
    throw "could not create order";
  } finally {
    session.endSession();
  }
};

export const createOrderedOrder = async (
  user: IUser,
  post: IPost,
  orderItems: CreateOrderItem[]
) => {
  let orderNum = 1;
  if (user.username !== "extra") {
    const prevOrder = await Order.findOne({
      postId: post._id,
      status: { $ne: "canceled" },
    }).sort({ orderNum: -1 });
    if (prevOrder) orderNum = prevOrder.orderNum + 1;
  } else orderNum = 0;

  const { displayName, username: userId, pictureUrl } = user;
  const {
    displayName: sellerDisplayName,
    postNum,
    title,
    _id,
    imageUrls,
  } = post;
  const imageUrl = () => {
    const image = imageUrls[0];
    if (typeof image === "object" && image !== null) return image.sm;
    else return image;
  };
  const order = new Order({
    orderNum,
    userId,
    displayName,
    sellerDisplayName,
    postNum,
    title,
    pictureUrl,
    postId: _id,
    imageUrl: imageUrl(),
    order: orderItems,
    fb: user.fb,
  });
  await order.save();
  return order;
};

export const createDeliveredOrder = async (
  post: IPost,
  orderItems: CreateOrderItem[],
  user: IUser,
  comment: string
) => {
  const { username, displayName } = user;
  const {
    displayName: sellerDisplayName,
    _id,
    postNum,
    title,
    pictureUrl,
    imageUrls,
  } = post;
  const order = new Order({
    orderNum: 0,
    userId: username,
    displayName,
    sellerDisplayName,
    postId: _id,
    postNum,
    title,
    pictureUrl,
    imageUrl: imageUrls[0].sm,
    order: orderItems.filter((item) => item.qty > 0),
    status: "delivered",
    deliveredAt: new Date().toISOString(),
    orderHistory: [{ status: "delivered" }],
    comment,
    fb: user.fb,
  });
  await order.save();
  return order;
};

export const categorizeOrders = (orderItems: SingleOrder[]) => {
  const ordered = orderItems.filter((i) => i.status === "ordered");
  const delivered = orderItems.filter((i) => i.status === "delivered");
  const completed = orderItems.filter((i) => i.status === "completed");
  const missing = orderItems.filter((i) => i.status === "missing");
  const canceled = orderItems.filter((i) => i.status === "canceled");

  const categories: { [key in OrderStatus]?: SingleOrder[] } = {};
  if (ordered.length > 0) categories["ordered"] = ordered;
  if (delivered.length > 0) categories["delivered"] = delivered;
  if (completed.length > 0) categories["completed"] = completed;
  if (missing.length > 0) categories["missing"] = missing;
  if (canceled.length > 0) categories["canceled"] = canceled;

  return categories;
};

export const updateOrder = async (
  session: ClientSession,
  order: IOrder,
  status: OrderStatus,
  orderItems: SingleOrder[]
) => {
  await Order.updateOne(
    { _id: order._id },
    {
      status,
      order: orderItems,
      hasName: order.hasName,
      comment: order.comment?.trim(),
      ...(status === "delivered" && { deliveredAt: new Date().toISOString() }),
    },
    { session }
  );
};

export const createOrder = async (
  session: ClientSession,
  order: IOrder,
  status: OrderStatus,
  orderItems: SingleOrder[]
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, orderHistory, ...rest } = order;
  const newOrder = new Order({
    ...rest,
    status,
    order: orderItems,
    orderHistory: [...orderHistory, { status }],
    ...(status === "delivered" && { deliveredAt: new Date().toISOString() }),
  });
  await newOrder.save({ session });
};

export const updateOrders = async (
  session: ClientSession,
  order: IOrder,
  categories: { [key in OrderStatus]?: SingleOrder[] }
) => {
  let updatedOriginalOrder = false;
  for (const status in categories) {
    if (!updatedOriginalOrder) {
      await updateOrder(
        session,
        order,
        status as OrderStatus,
        categories[status as OrderStatus] as SingleOrder[]
      );
    } else {
      await createOrder(
        session,
        order,
        status as OrderStatus,
        categories[status as OrderStatus] as SingleOrder[]
      );
    }
    updatedOriginalOrder = true;
  }
};

export const getCompletedOrdersSum = (orders?: IOrder[]) => {
  if (!orders) return 0;
  let sum = 0;
  for (const order of orders) {
    for (const item of order.order) {
      if (item.status === "completed") {
        sum += Number(item.price) * Number(item.qty);
      }
    }
  }
  return sum;
};

export const getOrderSum = (order: SingleOrder[]) => {
  let sum = 0;
  for (const item of order) {
    sum += Number(item.price) * Number(item.qty);
  }
  return sum;
};

export const getOrderList = (order: SingleOrder[]) => {
  let list = "";
  order.forEach((orderItem) => {
    const { id, item, qty, price } = orderItem;
    list += `➡️${id}.${item}+${qty} $${price * qty}\n`;
  });
  return list;
};

export const sendDeliveredMessage = async (order: IOrder) => {
  const { postNum, title, sellerDisplayName, userId } = order;
  const message = `
🛒#${postNum} ${title} #${sellerDisplayName}
${getOrderList(order.order)}小計$${getOrderSum(order.order)}
已到貨連結: ${FRONTEND_URL}/orders/delivered`;
  await notifyUser(userId, message);
};

interface OrderQueryData {
  limit?: number;
  page: number;
  query?: OrderQuery;
}

export const parseOrderQueryData = (data: OrderQueryData) => {
  const limit = getLimit(data.limit);
  const page = data.page >= 0 ? data.page : 0;
  const query = parseQuery(data.query);
  return { limit, page, query };
};

export const parseQuery = (query?: OrderQuery) => {
  if (!query) return {};
  const { postNum, status, userId, text } = query;

  const parsedQuery: ParsedOrderQuery = {};
  if (postNum) parsedQuery.postNum = postNum;
  if (userId) parsedQuery.userId = userId;
  if (status) parsedQuery.status = status;
  if (text) {
    const regExp = new RegExp(text, "i");
    parsedQuery.$or = [
      { title: regExp },
      { sellerDisplayName: regExp },
      { "order.item": regExp },
    ];
  }

  return parsedQuery;
};

const getLimit = (limit?: number) => {
  if (!limit) return 20;
  if (limit < 100) return limit;
  return 100;
};

export const getLocationQueryFilter = (query: any) => {
  const { location, postNum, text } = query;
  const filter: OrderLocationFilter = {};
  const orderLocation = location === "" ? "" : new RegExp(location, "i");
  if (typeof location === "string") {
    filter.$and = [{ "order.location": orderLocation }];
    if (["A", "B"].includes(location)) {
      filter.$and?.push({
        "order.location": {
          $nin: [new RegExp("凍", "i"), new RegExp("冰", "i")],
        },
      });
    }
  }
  if (postNum) filter.postNum = postNum;
  if (text) {
    const regExp = new RegExp(text, "i");
    filter.$or = [
      { title: regExp },
      { sellerDisplayName: regExp },
      { "order.item": regExp },
    ];
  }
  return { filter, orderLocation };
};

export const getLocationPosts = (
  orders: IOrder[],
  orderLocation: string | RegExp
) => {
  const posts: ILocationPost[] = [];
  for (const order of orders) {
    const { displayName, orderNum } = order;
    for (const item of order.order) {
      const index = posts.findIndex((post) => post.postNum === order.postNum);
      if (!item.location.match(orderLocation)) continue;

      const { _id, id, location, qty } = item;
      const orderItem = {
        displayName,
        orderNum,
        _id,
        id,
        item: item.item,
        qty,
        location,
        checked: false,
      };

      if (index === -1) {
        const { postNum, title, sellerDisplayName: displayName } = order;
        posts.push({
          postNum,
          title,
          displayName,
          items: [{ id, item: item.item, location: "", checked: false }],
          orderItems: [orderItem],
        });
      } else {
        posts[index].orderItems.push(orderItem);
        const itemsIndex = posts[index].items.findIndex(
          (item) => item.id === id
        );
        if (itemsIndex !== -1) continue;
        posts[index].items.push({
          id,
          item: item.item,
          location: "",
          checked: false,
        });
      }
    }
  }
  return posts;
};
