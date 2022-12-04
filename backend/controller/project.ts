import { Project } from "@prisma/client";
import db from "../db";
import { Result } from "../utils/result";

export async function getProjects(): Promise<Result<Project[]>> {
  const projects = await db.project.findMany({
    take: 20,
    include: {
      owner: {
        select: {
          name: true
        }
      }
    }
  })

  if (projects) return {
    data: projects
  }
  return { error: "Failed to retrieve projects" }
}

export async function getProjectById(id: any): Promise<Result<Project>> {
  if (!id || typeof id !== 'string') {
    return { error: "Invalid id" }
  }

  const project = await db.project.findUnique({
    where: {
      id: id
    },
    include: {
      owner: {
        select: {
          name: true
        }
      }
    }
  })

  if (project) return { data: project }
  return { error: "Project does not exist with id: " + id }
}

export async function getProjectsByOwner(id: any): Promise<Result<Project[]>> {
  if (!id || typeof id !== 'string') {
    return { error: "Incorrect id" }
  }

  const projects = await db.project.findMany({
    where: {
      ownerid: id
    },
    include: {
      owner: {
        select: {
          name: true
        }
      }
    }
  })

  if (projects) return { data: projects }
  return { error: "Failed to retrieve projects" }
}

export async function createProject(
  ownerid: string, project: Partial<Project>
): Promise<Result<Project>> {

  if (!project.title || !ownerid) {
    return {
      error: 'Insufficient information provided: ' +
        ownerid + " " + JSON.stringify(project)
    }
  }

  const newProject = await db.project.create({
    data: {
      title: project.title,
      description: project.description || '',
      cts: new Date(),
      uts: new Date(),
      ownerid: ownerid
    }
  })

  if (newProject) {
    return {
      data: newProject
    }
  }

  return {
    error: 'Failed to create project'
  }
}

export async function updateProject(id: any, project: Partial<Project>) {
  if (!id || typeof id !== 'string') {
    return { error: "Invalid id" }
  }

  const edit = {
    ...project.title && { title: project.title },
    ...project.description && { description: project.description },
  }

  const edittedProject = await db.project.update({
    where: { id },
    data: edit
  })

  if (edittedProject) {
    return {
      data: edittedProject
    }
  }

  return {
    error: 'Failed to update project'
  }
}

export async function deleteProject(id: any): Promise<Result<Project>> {
  if (!id || typeof id !== 'string') {
    return { error: "Incorrect id" }
  }

  const project = await db.project.delete({ where: { id } })

  if (project) {
    return {
      data: project
    }
  }

  return {
    error: 'Failed to update project'
  }
}
