export interface IUser {
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
  signupPlatform: "line" | "fb";
}

export interface UserQuery {
  pickupNum?: number;
  username?: string;
  notified?: string | boolean;
  status?: "registered" | "approved" | "blocked";
  role?: "basic" | "seller" | "admin";
}
