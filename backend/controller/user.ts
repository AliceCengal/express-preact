import { User } from "@prisma/client";
import db from "../db";
import exclude from "../utils/exclude";
import { Result } from "../utils/result";

export type UserResult = Promise<Result<Partial<User>>>

export async function getUserById(id: any): UserResult {
  if (!id || typeof id !== 'string') {
    return { error: "Invalid id" }
  }

  const user = await db.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      Project: true
    }
  })

  if (user) return { data: user }
  return { error: "User does not exist with id: " + id }
}

export async function updateUser(
  id: any,
  user: Partial<User>
): UserResult {

  if (!id || typeof id !== 'string') {
    return { error: "Invalid id" }
  }

  const edit = {
    ...user.name && { name: user.name },
  }

  const edittedProfile = await db.user.update({
    where: { id },
    data: edit
  })

  if (edittedProfile) {
    return { data: exclude(edittedProfile, ['password']) }
  }
  return { error: "Failed to update user profile" }
}
