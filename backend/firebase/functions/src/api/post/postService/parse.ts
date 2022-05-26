import { Request } from "express";

import { Filter, MongoosePost, PostStatus, Query, SellerQuery } from "../post";

export const getParams = (req: Request) => {
  const cursor = req.params.cursor;
  const limit = Math.min(Number(req.query.limit), 200);
  const query: SellerQuery | undefined =
    req.query.query && JSON.parse(req.query.query as string);
  let fb = undefined;
  if (req.query.fb === "true") fb = true;
  else if (req.query.fb === "false") fb = false;
  return { cursor, limit, query, fb };
};

export const getQueryConditions = (query: Query) => {
  const { type, value } = query;

  if (!type || !value) return {};

  switch (type) {
    case "text":
      if (typeof value !== "string") return {};
      const matcher = new RegExp(value, "i");
      return {
        status: { $ne: "canceled" },
        $or: [{ title: matcher }, { body: matcher }, { displayName: matcher }],
      };
    case "postNum":
      const postNum = Number(value);
      if (isNaN(postNum)) return {};
      return { postNum, status: { $nin: ["completed", "canceled"] } };
    case "deadline":
      return { deadline: value, status: { $ne: "canceled" } };
    case "deliveryDate":
      return { deliveryDate: value, status: { $ne: "canceled" } };
    case "userId":
      return { userId: value, status: { $ne: "canceled" } };
    default:
      return {};
  }
};

export const getQueryStatus = (status?: PostStatus | undefined): Filter => {
  if (!status) return { status: { $ne: "canceled" } };
  if (status === "closed") return { status: "closed" };
  return { status };
};

export const getPostsNextId = (array: MongoosePost[]) => {
  const lastIndex = array.length - 1;
  if (array[lastIndex]) return array[lastIndex].postNum;
  return undefined;
};
