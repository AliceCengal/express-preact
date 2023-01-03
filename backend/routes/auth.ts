import Debug from "debug";
import express from "express";
import createHttpError from "http-errors";
import { login, register } from "../controller/auth";
import { getUserById } from "../controller/user";

const debug = Debug("express-preact:auth");
const router = express.Router();

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;

  register(email, password)
    .then((user) => {
      if (req.session) req.session.userid = user.id;
      return res.status(200).json(user);
    })
    .catch(next);
});

router.put("/", async (req, res, next) => {
  const { email, password } = req.body;

  login(email, password)
    .then((user) => {
      if (req.session) req.session.userid = user.id;
      return res.status(200).json(user);
    })
    .catch(next);
});

router.delete("/", (req, res) => {
  req.session = null;
  res.status(200).send("Logged out");
});

router.get("/", (req, res, next) => {
  // debug(req.session)
  if (req.session?.userid) {
    getUserById(req.session.userid)
      .then((user) => res.json(user))
      .catch(next);
  } else {
    throw new createHttpError.Unauthorized("Not logged in");
  }
});

export default router;
