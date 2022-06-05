import * as express from "express";
import * as functions from "firebase-functions";

import * as compression from "compression";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import "module-alias/register";
import "source-map-support/register";

import comments from "api/comment/commentRouter";
import likes from "api/like/likeRouter";
import messages from "api/message/messageRouter";
import notify from "api/notify/notifyRouter";
import orders from "api/order/orderRouter";
import posts from "api/post/postRouter";
import rooms from "api/room/roomRouter";
import user from "api/user/userRouter";

const app = express();

const whitelist = [
  "https://xn--ndsp5rmr3blfh.com",
  "https://super-buy.app",
  "https://www.xn--ndsp5rmr3blfh.com",
  "http://localhost:3001",
  "http://localhost:3000",
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
};

app.use(cors(corsOptions));
app.use(compression());
app.use(cookieParser());

app.use("/user", user);
app.use("/posts", posts);
app.use("/orders", orders);
app.use("/comments", comments);
app.use("/likes", likes);
app.use("/notify", notify);
app.use("/rooms", rooms);
app.use("/messages", messages);

app.use((_req, res) => {
  return res.status(404).json({ error: "Route not defined" });
});

export const api_tw_firebase = functions
  .region("asia-east1")
  .runWith({ timeoutSeconds: 10 })
  .https.onRequest(app);

// export const api_fb_firebase = functions
//   .region("asia-east1")
//   .runWith({ timeoutSeconds: 10 })
//   .https.onRequest(app);

// firebase functions:config:get > .runtimeconfig.json
// firebase functions:config:set mongodb_uri.post_dev="<url>"
