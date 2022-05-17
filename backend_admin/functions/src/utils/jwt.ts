import * as functions from "firebase-functions";

import * as jwt from "jsonwebtoken";

export const signJWT = (payload: any) => {
  return jwt.sign(payload, functions.config().jwt_secret.key as string);
};

export const verifyJWT = (aid: string) => {
  return jwt.verify(aid, functions.config().jwt_secret.key as string) as {
    username: string;
  };
};
