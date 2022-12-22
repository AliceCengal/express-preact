import express from "express";
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  getProjectsByOwner,
  updateProject,
} from "../controller/project";
import { restricted } from "./common";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const projects = req.query.ownerid
    ? getProjectsByOwner(req.query.ownerid)
    : getProjects();

  projects.then((pro) => res.send(pro)).catch(next);
});

router.post("/", restricted, async (req, res, next) => {
  createProject(req.session?.user.id, req.body)
    .then((project) => res.send(project))
    .catch(next);
});

router.get("/:projectid", async (req, res, next) => {
  getProjectById(req.params.projectid)
    .then((project) => res.send(project))
    .catch(next);
});

router.post("/:projectid", restricted, async (req, res, next) => {
  updateProject(req.params.projectid, req.body)
    .then((project) => res.send(project))
    .catch(next);
});

router.delete("/:projectid", restricted, async (req, res, next) => {
  deleteProject(req.params.projectid)
    .then((project) => res.send(project))
    .catch(next);
});

export default router;
