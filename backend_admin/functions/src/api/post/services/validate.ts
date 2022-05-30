import { postSchema } from "../postSchema";

export const checkLimit = (limit: number) => {
  if (isNaN(limit)) throw "limit must be a number";
  if (limit <= 0) throw "limit must be greater than 0";
};

export const validatePost = (post: unknown) => {
  return postSchema.validate(post, { abortEarly: true, stripUnknown: true });
};
