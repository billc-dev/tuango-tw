import { Document } from "mongoose";

export interface INotify {
  username: string;
  token: string;
  fbToken: string;
}

export type MongooseNotify = Document<unknown, unknown, INotify> &
  INotify & {
    _id: string;
  };
