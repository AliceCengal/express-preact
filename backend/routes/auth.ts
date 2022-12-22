import Debug from "debug";
import express from "express";
import createHttpError from "http-errors";
import { login, register } from "../controller/auth";

const debug = Debug("express-preact:auth");
const router = express.Router();

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;

  register(email, password)
    .then((user) => {
      if (req.session) req.session.user = user;
      return res.status(200).json(user);
    })
    .catch(next);
});

router.put("/", async (req, res, next) => {
  const { email, password } = req.body;

  login(email, password)
    .then((user) => {
      if (req.session) req.session.user = user;
      return res.status(200).json(user);
    })
    .catch(next);
});

router.delete("/", (req, res) => {
  req.session = null;
  res.status(200).send("Logged out");
});

router.get("/", (req, res) => {
  // debug(req.session)
  if (req.session?.user) {
    res.status(200).json(req.session);
  } else {
    throw new createHttpError.Unauthorized("Not logged in");
  }
});

export default router;
