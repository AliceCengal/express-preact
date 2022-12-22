import { ErrorRequestHandler, RequestHandler } from "express";
import createHttpError from "http-errors";
import Debug from "debug";

const debug = Debug("express-preact:api");

export const restricted: RequestHandler = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    return res.status(400).send("User is not logged in");
  }
};

export const apiCatchall: RequestHandler = (req, res) => {
  throw new createHttpError.NotFound();
};

export const apiErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (createHttpError.isHttpError(err) && err.expose) {
    return res.status(err.statusCode).send(err.message);
  }
  debug(err);
  const e = new createHttpError.InternalServerError();
  res.status(e.statusCode).send(e.message);
};
