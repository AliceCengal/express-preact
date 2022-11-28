import { createHash } from 'crypto';
import Debug from 'debug';
import express from 'express'
import db from '../db';
import exclude from '../utils/exclude';

const debug = Debug("express-preact:auth")
const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).send("No email and password")
  }

  const user = await db.user.findFirst({
    where: { email: email }
  })

  if (user) {
    return res.status(400).send("Email already registered")
  }

  const hash = createHash("sha256")
  hash.update(email)
  hash.update(password)
  const hashedPassword = hash.digest().toString()
  const username = email.split("@")[0]

  const newUser = await db.user.create({
    data: {
      email,
      name: username,
      password: hashedPassword
    }
  })

  if (req.session) req.session.user = newUser

  return res.status(200).json({
    status: 'ok', data: exclude(newUser, ['password'])
  })
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).send("No email and password")
  }

  const user = await db.user.findFirst({
    where: { email: email }
  })

  if (!user) {
    return res.status(400).send("User not found")
  }

  const hash = createHash("sha256")
  hash.update(email)
  hash.update(password)
  const hashedPassword = hash.digest().toString()

  if (user.password !== hashedPassword) {
    return res.status(400).send("Wrong email and password")
  }

  if (req.session) req.session.user = user

  return res.status(200).json({
    status: 'ok', data: exclude(user, ['password'])
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
