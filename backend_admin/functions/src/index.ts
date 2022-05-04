import * as express from "express";
import * as functions from "firebase-functions";

import * as compression from "compression";
import * as cors from "cors";
import "module-alias/register";
import "source-map-support/register";

import deliver from "api/deliver/deliverRouter";
// import notify from "api/notify/notifyRouter";
// import orders from "api/order/orderRouter";
import posts from "api/post/postRouter";
import user from "api/user/userRouter";

const app = express();

const whitelist = [
  "http://localhost:3005",
  "https://tuango-tw-admin.vercel.app",
  "*",
  undefined,
];

const corsOptions: cors.CorsOptions = {
  origin: (origin: any, callback: any) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(compression());

app.use("/users", user);
app.use("/posts", posts);
app.use("/delivers", deliver);
// app.use("/orders", orders);
// app.use("/notify", notify);

app.use((_, res) => {
  return res.status(404).json({ error: "Route not defined" });
});

export const api_backend_admin = functions
  .region("asia-east1")
  .runWith({ timeoutSeconds: 15 })
  .https.onRequest(app);

// firebase functions:config:get > .runtimeconfig.json
// firebase functions:config:set mongodb_uri.post_dev="<url>"
