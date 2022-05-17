import { NextApiRequest, NextApiResponse } from "next";

import jwt_decode from "jwt-decode";

export default function auth(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "POST":
      const aid = req.cookies.aid;
      if (!aid) return res.json({ authenticated: false });
      try {
        const payload = jwt_decode<{ exp: number }>(aid);
        if (payload.exp <= Date.now() / 1000)
          return res.json({ authenticated: false });
        return res.json({ authenticated: true });
      } catch (error) {
        return res.json({ authenticated: false });
      }
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
