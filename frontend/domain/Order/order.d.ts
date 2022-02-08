export interface IOrder {
  _id: string;
  orderNum: number;
  userId: string;
  displayName: string;
  sellerDisplayName: string;
  postNum: number;
  title: string;
  pictureUrl: string;
  postId: string;
  imageUrl: string;
  order: SingleOrder[];
  comment: string;
  sellerComment: string;
  hasName: boolean;
  isExtra: boolean;
  createdAt: string;
  deliveredAt: string;
  canceledAt: string;
  orderHistory: OrderHistory[];
  status: "ordered" | "delivered" | "completed" | "missing" | "canceled";
}

interface OrderHistory {
  status: "ordered" | "delivered" | "completed" | "missing" | "canceled";
  createdAt: string;
}
interface SingleOrder {
  id: string;
  item: string;
  qty: number;
  price: number;
  status: string;
  location: string;
  hasName: boolean;
}
