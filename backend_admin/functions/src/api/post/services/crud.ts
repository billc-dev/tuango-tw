// import * as notifyService from "api/notify/notifyService";
import Order from "api/order/orderDB";
import { IUser } from "api/user/userDB";
import { indexAlphabet } from "utils/constant";

// import { FRONTEND_URL } from "utils/url";
import { MongoosePost, ValidatedPost } from "../post";
import { Post } from "../postDB";

export const createPost = (
  validatedPost: ValidatedPost,
  user: IUser,
  prevPostNum: number
) => {
  const items = validatedPost.items.map((item, index) => ({
    ...item,
    id: indexAlphabet[index],
  }));

  const post = new Post({
    ...validatedPost,
    items,
    userId: user.username,
    displayName: user.displayName,
    pictureUrl: user.pictureUrl,
    postNum: prevPostNum + 1,
  });
  return post.save();
};

export const sendGroupMessage = (_post: MongoosePost) => {
  // const message = `😊#${post.postNum} ${post.title}~${post.displayName}\n貼文連結: ${FRONTEND_URL}/posts?postId=${post._id}`;
  // return notifyService.notifyGroups(message);
};

export const findPrevPost = () => {
  return Post.findOne({ status: { $ne: "canceled" } })
    .sort({
      postNum: -1,
    })
    .select("postNum status");
};

export const updatePost = (
  postId: string,
  userId: string,
  post: ValidatedPost
) => {
  const items = post.items.map((item, index) => ({
    ...item,
    id: item.id ? item.id : indexAlphabet[index],
  }));
  return Post.updateOne(
    { _id: postId, userId },
    { ...post, items },
    { runValidators: true }
  );
};

export const updatePostStatus = (postId: string, status: string) => {
  return Post.updateOne(
    { _id: postId },
    { status, ...(status === "canceled" && { orderCount: 0 }) },
    { runValidators: true }
  );
};

export const updatePostDelivered = (postId: string, delivered: boolean) => {
  return Post.updateOne(
    { _id: postId },
    { delivered },
    { runValidators: true }
  );
};

export const deletePost = (postId: string, userId: string) => {
  return Post.findOneAndUpdate(
    { _id: postId, userId },
    { status: "canceled" },
    { new: true }
  );
};

export const cancelOrders = (postId: string) => {
  return Order.updateMany(
    { postId, status: "ordered" },
    {
      status: "canceled",
      $push: {
        orderHistory: {
          status: "canceled",
          createdAt: new Date().toISOString(),
        },
      },
    }
  );
};
