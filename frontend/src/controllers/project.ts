import { useQuery } from "react-query"
import wfetch from "utils/wrapped-fetch"

export type ProjectCR = {
  title: string,
  description: string,
  owner: string,
}

export interface Project {
  id: string,
  title: string,
  description: string,
  cts: string,
  uts: string,
  ownerid: string,
  owner?: { name: string }
}

export async function createProject(formData: ProjectCR) {
  return wfetch('/api/project', {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(formData)
  })
}

export function useFetchProject(id: string) {
  return useQuery(
    ['/api/project', id],
    async () => {
      return await wfetch('/api/project/' + id) as Project
    }
  )
}

export function useFetchAllProjects() {
  return useQuery(
    ['/api/project', 'all'],
    async () => {
      return await wfetch('/api/project') as Project[]
    }
  )
}

export function useFetchProjectsForOwner(id: string) {
  return useQuery(
    ['/api/project', id],
    async () => {
      return await wfetch('/api/project?ownerid=' + id) as Project[]
    }
  )
}
