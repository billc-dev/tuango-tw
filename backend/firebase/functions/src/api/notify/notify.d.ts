import { Document } from "mongoose";

export interface INotify {
  username: string;
  token: string;
  fbToken: string;
}

export type MongooseNotify = Document<unknown, any, INotify> &
  INotify & {
    _id: string;
  };

export interface FBMessaging {
  sender: { id: string };
  recipient: { id: string };
  timestamp: string;
  referral?: {
    ref?: string;
  };
  message?: {
    mid: string;
    text?: string;
  };
}

export interface FBPageUserProfile {
  first_name: string;
  last_name: string;
}
