export interface User {
  _id: string;
  username: string;
  displayName: string;
  pictureUrl: string;
  createdAt: string;
  pickupNum: number;
  role: "basic" | "seller" | "admin";
  status: "registered" | "approved" | "blocked";
  deliveredOrders: number;
  notified: boolean;
  linepay: boolean;
  comment: string;
  message: {
    notified: boolean;
    notifiedAt: string;
  };
  fb: boolean;
}
