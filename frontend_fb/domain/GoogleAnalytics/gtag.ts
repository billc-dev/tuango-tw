import { IOrder } from "domain/Order/types";

export const GA_TRACKING_ID = "G-5LRZRX4357";

export const pageview = (url: URL) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = (
  action: Gtag.EventNames,
  { event_category, event_label, value }: Gtag.EventParams
) => {
  window.gtag("event", action, { event_category, event_label, value });
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
