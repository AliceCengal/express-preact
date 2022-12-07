import { createHash } from "crypto";
import { RequestHandler } from "express";
import Debug from 'debug'
import db from "../db";
import exclude from "../utils/exclude";
import { UserResult } from "./user";

const debug = Debug("express-preact:auth")

export const restricted: RequestHandler = (req, res, next) => {
  if (req.session && req.session.user) {
    next()
  } else {
    return res.status(400).send("User is not logged in")
  }
}

export async function register(email: string, password: string): UserResult {
  if (!email || !password) {
    return { error: 'No email and password' }
  }

  const user = await db.user.findFirst({
    where: { email: email }
  })

  if (user) {
    return { error: "Email already registered" }
  }

  const hash = createHash("sha256")
  hash.update(email)
  hash.update(password)
  const hashedPassword = hash.digest().toString('hex')
  const username = email.split("@")[0]

  const newUser = await db.user.create({
    data: {
      email,
      name: username,
      password: hashedPassword
    }
  })

  if (newUser) {
    return { data: exclude(newUser, ['password']) }
  }
  return { error: "Failed to register user" }
}

export async function login(email: string, password: string): UserResult {

  if (!email || !password) {
    return { error: "No email and password" }
  }

  const user = await db.user.findFirst({
    where: { email: email }
  })

  if (!user) {
    return { error: "User not found" }
  }

  const hash = createHash("sha256")
  hash.update(email)
  hash.update(password)
  const hashedPassword = hash.digest().toString('hex')

  if (user.password !== hashedPassword) {
    return { error: "Wrong email and password" }
  }

  return { data: exclude(user, ['password']) }
}
