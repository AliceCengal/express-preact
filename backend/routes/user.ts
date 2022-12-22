import express from "express";
import { getUserById, updateUser } from "../controller/user";
import { restricted } from "./common";

const router = express.Router();

router.get("/:userid", async (req, res, next) => {
  getUserById(req.params.userid)
    .then((user) => res.send(user))
    .catch(next);
});

router.put("/:userid", restricted, async (req, res, next) => {
  updateUser(req.params.userid, req.body)
    .then((user) => res.send(user))
    .catch(next);
});

export default router;
