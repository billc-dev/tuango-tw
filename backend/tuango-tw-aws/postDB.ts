import * as mongoose from "mongoose";

const postsConn = mongoose.createConnection(
  process.env.MONGO_DB_POST as string
);

const PostSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  displayName: { type: String, required: true },
  pictureUrl: String,
  postNum: { type: Number, required: true },
  title: { type: String, required: true },
  videoUrl: String,
  imageUrls: Array,
  body: { type: String, required: true },
  items: {
    type: [
      {
        id: { type: String, required: true },
        item: { type: String, required: true },
        price: {
          type: Number,
          get: (v: any) => Number(v),
          set: (v: any) => Number(v),
          required: true,
        },
        itemQty: {
          type: Number,
          get: (v: any) => Number(v),
          set: (v: any) => Number(v),
          default: 100,
          required: true,
        },
      },
    ],
    required: true,
  },
  createdAt: { type: String, required: true },
  pushedAt: { type: String },
  deadline: String,
  deliveryDate: String,
  likeCount: { type: Number, required: true, default: 0 },
  commentCount: { type: Number, required: true, default: 0 },
  orderCount: { type: Number, required: true, default: 0 },
  normalTotal: { type: Number, required: true, default: 0 },
  extraTotal: { type: Number, required: true, default: 0 },
  normalFee: { type: Number, required: true, default: 0 },
  extraFee: { type: Number, required: true, default: 0 },
  storageType: {
    type: String,
    required: true,
    enum: ["roomTemp", "refrigerated", "frozen"],
  },
  status: {
    type: String,
    default: "open",
    enum: ["open", "closed", "completed", "canceled"],
  },
  comment: String,
  deliverImages: { type: Array, required: true, default: [] },
  delivered: { type: Boolean, default: false },
});
export const Post = postsConn.model("Post", PostSchema);
