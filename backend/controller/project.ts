import { Project } from "@prisma/client";
import createHttpError from "http-errors";
import Debug from "debug";
import db from "../db";

const debug = Debug("express-preact:project");

export async function getProjects(): Promise<Project[]> {
  const projects = await db.project.findMany({
    take: 20,
    include: {
      owner: {
        select: {
          name: true,
        },
      },
    },
  });

  if (projects) return projects;
  throw new createHttpError.InternalServerError("Failed to retrieve projects");
}

export async function getProjectById(id: any): Promise<Project> {
  if (!id || typeof id !== "string") {
    throw new createHttpError.BadRequest("Id is missing: " + id);
  }

  const project = await db.project.findUnique({
    where: {
      id: id,
    },
    include: {
      owner: {
        select: {
          name: true,
        },
      },
    },
  });

  if (project) return project;
  throw new createHttpError.NotFound("Project does not exist with id: " + id);
}

export async function getProjectsByOwner(id: any): Promise<Project[]> {
  if (!id || typeof id !== "string") {
    throw new createHttpError.BadRequest("Id is missing: " + id);
  }

  const projects = await db.project.findMany({
    where: {
      ownerid: id,
    },
    include: {
      owner: {
        select: {
          name: true,
        },
      },
    },
  });

  if (projects) return projects;
  throw new createHttpError.InternalServerError("Failed to retrieve projects");
}

export async function createProject(
  ownerid: string,
  project: Partial<Project>
): Promise<Project> {
  if (!project.title || !ownerid) {
    debug(ownerid);
    debug(JSON.stringify(project, null, 2));
    throw new createHttpError.BadRequest("Insufficient information provided");
  }

  const newProject = await db.project.create({
    data: {
      title: project.title,
      description: project.description || "",
      cts: new Date(),
      uts: new Date(),
      ownerid: ownerid,
    },
  });

  if (newProject) {
    return newProject;
  }
  throw new createHttpError.InternalServerError("Failed to create project");
}

export async function updateProject(id: any, project: Partial<Project>) {
  if (!id || typeof id !== "string") {
    throw new createHttpError.BadRequest("Id is missing: " + id);
  }

  const edit = {
    ...(project.title && { title: project.title }),
    ...(project.description && { description: project.description }),
  };

  const edittedProject = await db.project.update({
    where: { id },
    data: edit,
  });

  if (edittedProject) {
    return edittedProject;
  }
  throw new createHttpError.InternalServerError("Failed to update project");
}

export async function deleteProject(id: any): Promise<Project> {
  if (!id || typeof id !== "string") {
    throw new createHttpError.BadRequest("Id is missing: " + id);
  }

  const project = await db.project.delete({ where: { id } });

  if (project) {
    return project;
  }
  throw new createHttpError.InternalServerError("Failed to delete project");
}
