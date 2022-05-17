import * as functions from "firebase-functions";
import * as mongoose from "mongoose";

import { DB_OPTIONS, IS_DEV } from "utils/constant";

import { INotify } from "./notify";

const notifyConn = mongoose.createConnection(
  IS_DEV
    ? functions.config().mongodb_uri.notify_dev
    : functions.config().mongodb_uri.notify_prod,
  DB_OPTIONS
);

const NotifySchema = new mongoose.Schema<INotify>({
  username: { type: String, required: true },
  token: { type: String, required: true, default: "" },
  fbToken: { type: String, default: "" },
});

const Notify = notifyConn.model<INotify>("Notify", NotifySchema);

export default Notify;
