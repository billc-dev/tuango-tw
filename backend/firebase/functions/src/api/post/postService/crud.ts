import * as notifyService from "api/notify/notifyService";
import { IUser } from "api/user/userDB";
import { indexAlphabet } from "utils/constant";

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

export const sendGroupMessage = (post: MongoosePost) => {
  const message = `😊#${post.postNum} ${post.title}~${post.displayName}\n貼文連結: https://tuango.billcheng.dev/posts?postId=${post._id}`;
  return notifyService.notifyGroups(message);
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
  return Post.findOneAndUpdate({ _id: postId, userId }, post, { new: true });
};

export const closePost = (postId: string, userId: string) => {
  return Post.findOneAndUpdate(
    { _id: postId, userId },
    { status: "closed" },
    { new: true }
  );
};

export const deletePost = (postId: string, userId: string) => {
  return Post.findOneAndUpdate(
    { _id: postId, userId },
    { status: "canceled" },
    { new: true }
  );
};
