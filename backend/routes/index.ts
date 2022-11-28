import express from 'express'
const router = express.Router();

import authRoute from "./auth"
router.use('/auth', authRoute)

import userRoute from './user'
router.use('/user', userRoute)

import projectRoute from "./project"
router.use("/project", projectRoute)

router.all('*', function(req, res, next) {
  res.status(404)
});

export default router
