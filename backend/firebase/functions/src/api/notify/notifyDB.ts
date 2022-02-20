import * as functions from "firebase-functions";
import * as mongoose from "mongoose";
import { INotify } from "./notify";

const notifyConn = mongoose.createConnection(
  functions.config().mongodb_uri.notify_dev
);

const NotifySchema = new mongoose.Schema<INotify>({
  username: { type: String, required: true },
  token: { type: String, required: true },
});

const Notify = notifyConn.model<INotify>("Notify", NotifySchema);

export default Notify;
