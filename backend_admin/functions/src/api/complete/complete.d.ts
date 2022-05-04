import { IReducedOrder } from "api/order/order";

interface IOrder {
  id: string;
  item: string;
  price: number;
  qty: number;
  location: string;
}
interface IReducedOrder {
  orderId: string;
  orderNum: number;
  postId: string;
  postNum: number;
  title: string;
  sellerDisplayName: string;
  order: IOrder[];
  hasName: boolean;
}

export interface IComplete {
  _id: string;
  userId: string;
  displayName: string;
  createdAt: string;
  total: number;
  orders: IReducedOrder[];
  admin: string;
  payment: {
    linePay: boolean;
    confirmed: boolean;
  };
}
