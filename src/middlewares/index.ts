import express from "express";
import { get, merge } from "lodash";
import { getUserBySessionToken } from "../db/users";
import { nextTick } from "process";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["token"];
    if (!sessionToken) {
      return res.sendStatus(403);
    }
    const user = await getUserBySessionToken(sessionToken);
    if (!user) {
      return res.sendStatus(403);
    }
    merge(req, { identity: user });
    return next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(403);
  }
};
