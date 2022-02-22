import * as functions from "firebase-functions";
import * as compression from "compression";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";
import * as express from "express";

import user from "./api/user/userRouter";
import posts from "./api/post/postRouter";
import orders from "./api/order/orderRouter";
import comments from "./api/comment/commentRouter";

const app = express();

const whitelist = [
  "http://localhost:3000",
  "https://tuango-tw.vercel.app",
  "http://172.20.10.3:3000",
  "https://tuango.tw.billcheng.dev",
  "*",
  undefined,
];

const corsOptions: cors.CorsOptions = {
  origin: (origin: any, callback: any) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,

  // allowedHeaders: ["type", "content-type"],
};
app.use(cors(corsOptions));
app.use(compression());
app.use(cookieParser());

app.use("/user", user);
app.use("/posts", posts);
app.use("/orders", orders);
app.use("/comments", comments);

app.use((_req, res) => {
  return res.status(404).json({ error: "Route not defined" });
});

export const api_tw_firebase = functions
  .region("asia-east1")
  .runWith({ timeoutSeconds: 10 })
  .https.onRequest(app);

// firebase functions:config:get > .runtimeconfig.json
