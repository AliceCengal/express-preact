import { createHash } from "crypto";
import Debug from "debug";
import createHttpError from "http-errors";
import db from "../db";
import exclude from "../utils/exclude";
import { UserResult } from "./user";

const debug = Debug("express-preact:auth");

export async function register(email: string, password: string): UserResult {
  if (!email || !password) {
    throw new createHttpError.BadRequest(
      "Email and password missing: " + email + " " + password
    );
  }

  const user = await db.user.findFirst({
    where: { email: email },
  });

  if (user) {
    throw new createHttpError.BadRequest("Email already registered");
  }

  const hash = createHash("sha256");
  hash.update(email);
  hash.update(password);
  const hashedPassword = hash.digest().toString("hex");
  const username = email.split("@")[0];

  const newUser = await db.user.create({
    data: {
      email,
      name: username,
      password: hashedPassword,
    },
  });

  if (newUser) {
    return exclude(newUser, ["password"]);
  }
  throw new createHttpError.InternalServerError("Failed to register user");
}

export async function login(email: string, password: string): UserResult {
  if (!email || !password) {
    throw new createHttpError.BadRequest(
      "Email and password missing: " + email + " " + password
    );
  }

  const user = await db.user.findFirst({
    where: { email: email },
  });

  if (!user) {
    throw new createHttpError.NotFound("No user registered for: " + email);
  }

  const hash = createHash("sha256");
  hash.update(email);
  hash.update(password);
  const hashedPassword = hash.digest().toString("hex");

  if (user.password !== hashedPassword) {
    throw new createHttpError.BadRequest(
      "Wrong email/password " + email + " " + password
    );
  }

  return exclude(user, ["password"]);
}
