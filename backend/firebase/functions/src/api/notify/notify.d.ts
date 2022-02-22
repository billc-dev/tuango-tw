import { Document } from "mongoose";

export interface INotify {
  username: string;
  token: string;
}

export type MongooseNotify = Document<unknown, any, INotify> &
  INotify & {
    _id: string;
  };
