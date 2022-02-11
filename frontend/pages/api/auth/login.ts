import { NextApiRequest, NextApiResponse } from "next";
import { lineLogin } from "services/auth/lineLogin";
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from "services/auth/token";
import { findOrCreateUser } from "services/auth/user";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { code, url } = req.body;
        if (!code) throw "code or url missing";

        const lineProfile = await lineLogin({ code, url });
        const user = await findOrCreateUser(lineProfile);
        if (typeof user?.username !== "string") throw "username malformed";

        sendRefreshToken(res, createRefreshToken(user.username));

        return res
          .status(200)
          .json({ user, accessToken: createAccessToken(user.username) });
      } catch (error) {
        return res.status(404).json({ error });
      }
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
