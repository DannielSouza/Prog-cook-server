import { merge } from "lodash";

import { Request, Response, NextFunction } from "express";
import { getUserBySessionToken } from "helpers/getUserBySessionToken";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken = req.cookies["COOK-AUTH"];
    if (!sessionToken) return res.status(403).end();

    const existingUser = getUserBySessionToken(sessionToken);
    if (!existingUser) return res.status(403).end();

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    return res.status(400);
  }
};
