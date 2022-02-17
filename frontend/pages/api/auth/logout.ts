import { NextApiRequest, NextApiResponse } from "next";
import * as cookie from "cookie";

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST":
      // res.removeHeader("Set-Cookie");
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("aid", "", {
          maxAge: -1,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/api/auth",
        })
      );
      return res.json({ logout: true });
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
