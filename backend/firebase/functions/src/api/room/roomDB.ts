import * as functions from "firebase-functions";
import * as mongoose from "mongoose";

import { IUser, UserSchema, usersConn } from "api/user/userDB";

export const roomsConn = mongoose.createConnection(
  functions.config().mongodb_uri.room_dev
);

export interface IRoomUser {
  user: string | IUser;
  notifications: number;
  notified: boolean;
  notifiedAt: string;
}

export interface IRoom {
  _id: string;
  users: IRoomUser[];
  lastCreatedAt: string;
  lastMessage: string;
  hasMessage: boolean;
}

export type MongooseRoom = mongoose.Document<unknown, any, IRoom> &
  IRoom & { _id: string };

const RoomSchema = new mongoose.Schema<IRoom>({
  users: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: usersConn.model("User", UserSchema),
        required: true,
      },
      notifications: { type: Number, required: true, default: 0 },
      notified: { type: Boolean, required: true, default: false },
      notifiedAt: {
        type: String,
        required: true,
        default: () => new Date().toISOString(),
      },
    },
  ],
  lastMessage: { type: String, default: "" },
  lastCreatedAt: {
    type: String,
    required: true,
    default: () => new Date().toISOString(),
  },
  hasMessage: { type: Boolean, required: true, default: false },
});

export const Room = roomsConn.model<IRoom>("Room", RoomSchema);
