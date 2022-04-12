import { User } from "api/user/userDB";
import { verifyJWT } from "utils/jwt";

import asyncWrapper from "./asyncWrapper";

export const isAuthorized = asyncWrapper(async (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) return res.status(403).json({ error: "No auth token" });

  const token = verifyJWT(authToken);
  const user = await User.findOne({ username: token.username });

  if (!user) return res.status(403).json({ error: "User not found" });
  if (user.status !== "approved")
    return res.status(403).json({ error: "User not approved" });

  res.locals.user = user;
  return next();
});
