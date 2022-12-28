import { Project, User } from "@prisma/client";
import useSWR from "swr";
import wfetch from "utils/wrapped-fetch";

export type ProjectCR = {
  title: string;
  description: string;
  owner: string;
};

export type ProjectWithOwner = Project & {
  owner: User;
};

export async function createProject(formData: ProjectCR) {
  return wfetch("/api/project", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
}

export function useFetchProject(id: string) {
  return useSWR("/api/project/" + id, wfetch);
}

export function useFetchAllProjects() {
  return useSWR("/api/project/", wfetch);
}

export function useFetchProjectsForOwner(id: string) {
  return useSWR("/api/project?ownerid=" + id, wfetch);
}
