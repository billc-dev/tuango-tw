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
