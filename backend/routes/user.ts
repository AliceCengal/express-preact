import express from "express";
import createHttpError from "http-errors";
import { getUserById, updateUser } from "../controller/user";
import { restricted } from "./common";

const router = express.Router();

router.get("/:userid", async (req, res, next) => {
  getUserById(req.params.userid)
    .then((user) => res.send(user))
    .catch(next);
});

router.put("/:userid", restricted, async (req, res, next) => {
  const { userid } = req.params;
  if (req.session?.userid === userid)
    updateUser(req.params.userid, req.body)
      .then((user) => res.send(user))
      .catch(next);
  else throw new createHttpError.Unauthorized("Wrong user");
});

export default router;
