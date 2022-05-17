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
  checked: boolean;
}
