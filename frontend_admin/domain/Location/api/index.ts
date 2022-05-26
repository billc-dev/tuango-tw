import axios from "axios";

import {
  ILocationOrderItem,
  ILocationPost,
  ILocationPostItem,
} from "domain/Post/types";

import { LocationQuery } from "../types";

export const fetchLocationOrders = async (query: LocationQuery) => {
  const res = await axios.post<{ posts: ILocationPost[] }>("/orders/location", {
    query,
  });
  return res.data.posts;
};

interface UpdateOrdersLocationParams {
  postItems: ILocationPostItem[];
  orderItems: ILocationOrderItem[];
}

export const updateOrdersLocation = async ({
  postItems,
  orderItems,
}: UpdateOrdersLocationParams) => {
  const res = await axios.patch("/orders/location", {
    postItems,
    orderItems,
  });
  return res.data;
};
