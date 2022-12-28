import { Project, User } from "@prisma/client";
import useSWR from "swr";
import wfetch from "utils/wrapped-fetch";

export function useFetchUser(id: string) {
  return useSWR("/api/user/" + id, wfetch);
}

export type UserWithProfile = User & {
  Project: Project[];
};
