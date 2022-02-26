import { Request } from "express";
import { Post } from ".";
import { MongooseOrder } from "../order/order";
import { IOrderForm } from "../order/orderSchema";
import { IPostComplete, MongoosePost, Query } from "./post";
interface SetObject {
  orderCount: number;
  [key: string]: number;
}

export const decrementItemQty = async (
  order: IOrderForm,
  post: IPostComplete
) => {
  const $set: SetObject = { orderCount: 1 };

  order.items!.forEach((item) => {
    const index = post.items.findIndex((i) => i.id === item.id);
    $set[`items.${index}.itemQty`] = -item.qty;
  });

  const updatedPost = await Post.findOneAndUpdate(
    { _id: post._id },
    { $inc: $set },
    { new: true }
  );

  return updatedPost;
};

export const incrementItemQty = async (
  order: MongooseOrder,
  post: MongoosePost
) => {
  const $set: SetObject = { orderCount: -1 };

  order.order.forEach((item) => {
    const index = post.items.findIndex((i) => i.id === item.id);
    const key = `items.${index}.itemQty`;
    const value = item.qty;
    $set[key] = value;
  });

  const updatedPost = await Post.findOneAndUpdate(
    { _id: post._id },
    { $inc: $set },
    { new: true }
  );

  return updatedPost;
};

export const incrementCommentCount = (increment: number, postId: string) => {
  return Post.findByIdAndUpdate(
    postId,
    { $inc: { commentCount: increment } },
    { new: true }
  );
};

export const incrementLikeCount = (increment: number, postId: string) => {
  return Post.findByIdAndUpdate(
    postId,
    { $inc: { likeCount: increment } },
    { new: true }
  );
};

export const getQueryConditions = (query: Query) => {
  const { type, value } = query;

  if (!type || !value) return {};

  switch (type) {
    case "text":
      if (typeof value !== "string") return {};
      const matcher = new RegExp(value, "i");
      return {
        // status: { $ne: "canceled" },
        $or: [{ title: matcher }, { body: matcher }, { displayName: matcher }],
      };
    case "postNum":
      const postNum = Number(value);
      if (isNaN(postNum)) return {};
      return { postNum, status: { $nin: ["completed", "canceled"] } };
    case "deadline":
      return { deadline: value };
    case "deliveryDate":
      return { deliveryDate: value };
    default:
      return {};
  }
};

export const getPostsNextId = (array: MongoosePost[]) => {
  const lastIndex = array.length - 1;
  if (array[lastIndex]) return array[lastIndex].postNum;
  return undefined;
};

export const getParams = (req: Request) => {
  const cursor = req.params.cursor;
  const limit = Number(req.query.limit);
  const query = req.query.query && JSON.parse(req.query.query as string);
  return { cursor, limit, query };
};

export const checkLimit = (limit: number) => {
  if (isNaN(limit)) throw "limit must be a number";
  if (limit <= 0) throw "limit must be greater than 0";
};

export const postCards = {
  postNum: 1,
  title: 1,
  displayName: 1,
  imageUrls: 1,
  items: 1,
  orderCount: 1,
  status: 1,
};
