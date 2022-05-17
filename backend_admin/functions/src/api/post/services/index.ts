import { PostQuery } from "../post";

export * from "./increment";
export * from "./validate";
export * from "./crud";

interface PostQueryData {
  limit?: number;
  page: number;
  query?: PostQuery;
}

export const parsePostQueryData = (data: PostQueryData) => {
  const limit = getLimit(data.limit);
  const page = data.page >= 0 ? data.page : 0;
  const query = parseQuery(data.query);
  return { limit, page, query };
};

export const parseQuery = (query?: PostQuery) => {
  if (!query) return {};
  const { postNum, title, userId, storageType } = query;
  const { deadline, deliveryDate, status } = query;

  const parsedQuery: PostQuery = {};
  if (postNum) parsedQuery.postNum = postNum;
  if (title) parsedQuery.title = new RegExp(title, "i");
  if (userId) parsedQuery.userId = userId;
  if (storageType) parsedQuery.storageType = storageType;
  if (deadline) parsedQuery.deadline = deadline;
  if (deliveryDate) parsedQuery.deliveryDate = deliveryDate;
  if (status) parsedQuery.status = status;

  return parsedQuery;
};

const getLimit = (limit?: number) => {
  if (!limit) return 20;
  if (limit < 100) return limit;
  return 100;
};
