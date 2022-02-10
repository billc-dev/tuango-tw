import { NextApiRequest, NextApiResponse } from "next";
import * as cookie from "cookie";
export default function auth(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "POST":
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("aid", "test cookie", {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          //   maxAge: 60 * 60 * 24 * 7, // 1 week
        })
      );
      res.status(200).json({ test: "test" });

      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
