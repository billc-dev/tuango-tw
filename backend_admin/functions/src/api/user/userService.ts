import { UserQuery } from "./user";

interface UserQueryData {
  limit?: number;
  page: number;
  query?: UserQuery;
}

export const parseUserQueryData = (data: UserQueryData) => {
  const limit = getLimit(data.limit);
  const page = data.page >= 0 ? data.page : 0;
  const query = parseQuery(data.query);
  return { limit, page, query };
};

export const parseQuery = (query?: UserQuery) => {
  if (!query) return {};
  const { pickupNum, username, notified, status, role } = query;

  const parsedQuery: UserQuery = {};
  if (pickupNum) parsedQuery.pickupNum = pickupNum;
  if (username) parsedQuery.username = username;
  if (notified === "true") parsedQuery.notified = true;
  if (notified === "false") parsedQuery.notified = false;
  if (status) parsedQuery.status = status;
  if (role) parsedQuery.role = role;

  return parsedQuery;
};

const getLimit = (limit?: number) => {
  if (!limit) return 20;
  if (limit < 100) return limit;
  return 100;
};
