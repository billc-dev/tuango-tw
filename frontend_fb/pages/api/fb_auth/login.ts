import { NextApiRequest, NextApiResponse } from "next";

import { findOrCreateFBUser } from "api/auth/authService";
import { fbLogin } from "api/auth/fbLogin";
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from "api/auth/token";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { code, redirect_uri } = req.body;
        if (!code) throw "code or redirect_uri missing";

        const fbProfile = await fbLogin(code, redirect_uri);
        const user = await findOrCreateFBUser(fbProfile);
        if (!user) throw "user not found or created";

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
