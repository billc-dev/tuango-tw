import { NextApiRequest, NextApiResponse } from "next";
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
  verifyJWT,
} from "api/auth/token";

export default async function refresh_token(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        if (!req.cookies.aid)
          return res.json({ error: "no token", tokenError: true });
        const jwt = verifyJWT(req.cookies.aid);
        sendRefreshToken(res, createRefreshToken(jwt.username));
        return res.json({ accessToken: createAccessToken(jwt.username) });
      } catch (error) {
        return res.status(404).json({ error });
      }
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
