import express from 'express'
import { restricted } from '../controller/auth';
import { getUserById, updateUser } from '../controller/user';
import { handleResult } from '../utils/result';

var router = express.Router();

router.get('/:userid', async (req, res, next) => {
  handleResult(
    getUserById(req.params.userid),
    res
  )
});

router.post("/:userid", restricted, async (req, res) => {
  handleResult(
    updateUser(req.params.userid, req.body),
    res
  )
})

export default router
