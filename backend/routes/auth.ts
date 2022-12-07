import { createHash } from 'crypto';
import Debug from 'debug';
import express from 'express'
import { login, register } from '../controller/auth';
import db from '../db';
import exclude from '../utils/exclude';

const debug = Debug("express-preact:auth")
const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body

  register(email, password)
    .then(result => {
      if ('error' in result) {
        return res.status(400).send(result.error)
      }
      if (req.session) req.session.user = result.data

      return res.status(200).json(result.data)
    })
    .catch(err => {
      debug('Error when registering user', err)
      return res.status(500).send(err)
    })
})

router.put("/", async (req, res) => {
  const { email, password } = req.body

  login(email, password)
    .then(result => {
      if ('error' in result) {
        return res.status(400).send(result.error)
      }
      if (req.session) req.session.user = result.data

      return res.status(200).json(result.data)
    })
    .catch(err => {
      debug('Error when logging in user', err)
      return res.status(500).send(err)
    })
})

router.delete('/', (req, res) => {
  req.session = null
  res.status(200).send("logged out")
})

router.get("/", (req, res) => {
  // debug(req.session)
  if (req.session?.user) {
    res.status(200).json(req.session)
  } else {
    res.status(400).send("Not logged in")
  }
})

export default router
