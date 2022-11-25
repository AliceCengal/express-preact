import express from 'express'
var router = express.Router();

import userRoute from './users'
router.use('/user', userRoute)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Express + Typescript server");
});

export default router
