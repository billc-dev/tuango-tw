import * as express from "express";
import * as functions from "firebase-functions";

import axios from "axios";
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
  "http://localhost:3000",
  "https://tuango-tw.vercel.app",
  "http://172.20.10.3:3000",
  "https://tuango.billcheng.dev",
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

export const pingVercel = functions
  .region("asia-east1")
  .pubsub.schedule("every 2 minutes")
  .onRun(async () => {
    try {
      await axios.get(
        "https://xn--ndsp5rmr3blfh.com/posts?postId=6254430bf63a6c33a8a22b5a"
      );
    } catch (error) {
      console.log(error);
    }
    return null;
  });

export const pingFirebase = functions
  .region("asia-east1")
  .pubsub.schedule("every 2 minutes")
  .onRun(async () => {
    try {
      await axios.get(
        "https://asia-east1-tuango-tw-firebase.cloudfunctions.net/api_tw_firebase/posts/paginate/initial?limit=20"
      );
    } catch (error) {
      console.log(error);
    }
    return null;
  });

// firebase functions:config:get > .runtimeconfig.json
// firebase functions:config:set mongodb_uri.post_dev="<url>"
