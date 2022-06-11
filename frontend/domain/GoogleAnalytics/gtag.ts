import { AxiosError } from "axios";

import { IOrder } from "domain/Order/types";

export const GA_TRACKING_ID = "G-LJCQZHWBKN";

export const pageview = (url: URL) => {
  if (typeof window.gtag === "undefined") return;
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = (action: Gtag.EventNames, params: Gtag.EventParams) => {
  if (typeof window.gtag === "undefined") return;
  window.gtag("event", action, params);
};

export const purchaseEvent = (order: IOrder) => {
  const value = order.order.reduce(
    (sum, item) => (sum += item.price * item.qty),
    0
  );
  const items = order.order.map((item) => ({
    id: order.postId + item.id,
    name: item.item,
    quantity: item.qty,
    price: item.price,
  }));
  event("purchase", {
    transaction_id: order._id,
    currency: "TWD",
    value,
    items,
  });
};

export const refundEvent = (order: IOrder) => {
  const value = order.order.reduce(
    (sum, item) => (sum += item.price * item.qty),
    0
  );
  const items = order.order.map((item) => ({
    id: order.postId + item.id,
    name: item.item,
    quantity: item.qty,
    price: item.price,
  }));
  event("refund", {
    transaction_id: order._id,
    currency: "TWD",
    value,
    items,
  });
};

export const exceptionEvent = (error: AxiosError, header: string) => {
  event("exception", {
    description: JSON.stringify({
      ...error.response?.data,
      header,
    }),
    fatal: true,
  });
};
