import * as mongoose from "mongoose";

const usersConn = mongoose.createConnection(process.env.MONGO_USER as string);

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
}

const UserSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true },
  displayName: { type: String, required: true },
  pictureUrl: String,
  createdAt: {
    type: String,
    required: true,
    default: () => new Date().toISOString(),
  },
  pickupNum: { type: Number, required: true },
  role: {
    type: String,
    default: "basic",
    enum: ["basic", "seller", "admin"],
  },
  status: {
    type: String,
    default: "registered",
    enum: ["registered", "approved", "blocked"],
  },
  deliveredOrders: { type: Number, required: true, default: 0 },
  notified: { type: Boolean, required: true, default: false },
  linepay: { type: Boolean, required: true, default: false },
  comment: String,
  message: {
    notified: { type: Boolean, default: false },
    notifiedAt: { type: String, default: () => new Date().toISOString() },
  },
  fb: { type: Boolean, default: false },
});

export const User = usersConn.model<IUser>("User", UserSchema);
