import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import JWT_SECRET from "./config.ts";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token: string | undefined = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ message: `Access denied. No token provided.` });
  jwt.verify(
    token,
    JWT_SECRET,
    (err: jwt.VerifyErrors, decoded: string | jwt.JwtPayload) => {
      if (err)
        return res
          .status(403)
          .json({ message: `Invalid token, access denied` });
      req.user = decoded;
      next();
    },
  );
};

export default authenticate;
