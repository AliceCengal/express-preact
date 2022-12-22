import express from "express";
const router = express.Router();

import authRoute from "./auth";
router.use("/auth", authRoute);

import userRoute from "./user";
router.use("/user", userRoute);

import projectRoute from "./project";
router.use("/project", projectRoute);

import { apiCatchall, apiErrorHandler } from "./common";

// prevent /api requests from bleeding to the frontend
router.all("*", apiCatchall);

// handle all backend errors
router.use(apiErrorHandler);

export default router;
