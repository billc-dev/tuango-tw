import * as cookie from "cookie";
import * as jwt from "jsonwebtoken";
import { NextApiResponse } from "next";

export const signJWT = (payload: any) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string);
};

export const verifyJWT = (aid: string) => {
  return jwt.verify(aid, process.env.JWT_SECRET as string) as {
    username: string;
  };
};

export const createAccessToken = (username: string) => {
  return jwt.sign({ username }, process.env.JWT_SECRET!, {
    expiresIn: "15m",
  });
};

export const createRefreshToken = (username: string) => {
  return jwt.sign({ username }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};

export const sendRefreshToken = (res: NextApiResponse, token: string) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("aid", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/auth",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    })
  );
};
