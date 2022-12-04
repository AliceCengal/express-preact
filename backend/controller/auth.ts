import { RequestHandler } from "express";

export const restricted: RequestHandler = (req, res, next) => {
  if (req.session && req.session.user) {
    next()
  } else {
    return res.status(400).send("User is not logged in")
  }
}
