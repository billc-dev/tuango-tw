import axios from "axios";

import { IOrder } from "domain/Order/types";

import { DeliverQuery, IDeliver } from "../types";

export const fetchPostDelivers = async (postId: string) => {
  const res = await axios.get<{ delivers: IDeliver[] }>(
    `/delivers/post/${postId}`
  );
  return res.data.delivers;
};

interface PatchDeliverAmountParams {
  deliverId: string;
  amount: {
    normalTotal: number;
    normalFee: number;
    extraTotal: number;
    extraFee: number;
  };
}

export const patchDeliverAmount = async ({
  deliverId,
  amount,
}: PatchDeliverAmountParams) => {
  const res = await axios.patch<{ deliver: IDeliver }>(
    `/delivers/${deliverId}`,
    amount
  );
  return res.data.deliver;
};

interface DeliverOrdersParams {
  orders: IOrder[];
  normalItemSum: number;
  extraItemSum: number;
  totalItemSum: number;
}

export const deliverOrders = async (params: DeliverOrdersParams) => {
  const res = await axios.patch<{ deliver: IDeliver }>(
    "/orders/deliver",
    params
  );
  return res.data.deliver;
};

interface DeliverResponse {
  delivers: IDeliver[];
  nextId: string | undefined;
  hasMore: boolean;
}

export const fetchDelivers = async (
  cursor: string,
  limit: number,
  query?: DeliverQuery
) => {
  const res = await axios.get<DeliverResponse>(`/delivers/paginate/${cursor}`, {
    params: { limit, query },
  });

  return {
    delivers: res.data.delivers,
    nextId: res.data.hasMore ? res.data.nextId : undefined,
  };
};
