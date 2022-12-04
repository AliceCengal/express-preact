import express from 'express'
import { restricted } from '../controller/auth';
import { createProject, deleteProject, getProjectById, getProjects, getProjectsByOwner, updateProject } from '../controller/project';
import { handleResult } from '../utils/result';

var router = express.Router();

router.get('/', async (req, res) => {
  if (req.query.ownerid) {
    handleResult(
      getProjectsByOwner(req.query.ownerid),
      res
    )
  }
  else handleResult(getProjects(), res)
});

router.post('/', restricted, async (req, res) => {
  handleResult(
    createProject(req.session?.user.id, req.body),
    res
  )
})

router.get('/:projectid', async (req, res) => {
  handleResult(
    getProjectById(req.params.projectid),
    res
  )
})

router.post('/:projectid', restricted, async (req, res) => {
  handleResult(
    updateProject(req.params.projectid, req.body),
    res
  )
})

router.delete('/:projectid', restricted, async (req, res) => {
  handleResult(
    deleteProject(req.params.projectid),
    res
  )
})

export default router
