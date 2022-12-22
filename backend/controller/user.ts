import { User } from "@prisma/client";
import createHttpError from "http-errors";
import db from "../db";
import exclude from "../utils/exclude";

export type UserResult = Promise<Partial<User>>;

export async function getUserById(id: any): UserResult {
  if (!id || typeof id !== "string") {
    throw new createHttpError.BadRequest("Id is missing");
  }

  const user = await db.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      Project: true,
    },
  });

  if (user) return user;
  throw new createHttpError.NotFound("User does not exist with id: " + id);
}

export async function updateUser(id: any, user: Partial<User>): UserResult {
  if (!id || typeof id !== "string") {
    throw new createHttpError.BadRequest("Id is missing");
  }

  const edit = {
    ...(user.name && { name: user.name }),
  };

  const edittedProfile = await db.user.update({
    where: { id },
    data: edit,
  });

  if (edittedProfile) {
    return exclude(edittedProfile, ["password"]);
  }
  throw new createHttpError.InternalServerError(
    "Failed to update user profile"
  );
}
