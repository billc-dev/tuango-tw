interface OrderItem {
  id: string;
  item: string;
  qty: number;
  amount: number;
}

export interface IDeliver {
  _id: string;
  userId: string;
  displayName: string;
  postId: string;
  postNum: number;
  title: string;
  createdAt: string;
  normalOrders: OrderItem[];
  extraOrders: OrderItem[];
  normalTotal: number;
  extraTotal: number;
  normalFee: number;
  extraFee: number;
  checked?: boolean;
}

export interface DeliverSums {
  normalItemSum: number;
  extraItemSum: number;
  totalItemSum: number;
}

interface DeliverItem {
  qty: number;
  amount: number;
  id: string;
  item: string;
  price: number;
}

export interface DeliverItemsAndSums extends DeliverSums {
  normalItems: DeliverItem[];
  extraItems: DeliverItem[];
  totalItems: DeliverItem[];
}

export interface DeliverQuery {
  userId?: string;
}
