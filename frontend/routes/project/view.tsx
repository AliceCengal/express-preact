import { h, Fragment } from "preact";
import { ProjectCard } from "components/project/card";
import { useFetchProject } from "controllers/project";

import style from "./style.css";

interface Props {
  projectid: string;
}

export default function ProjectView({ projectid }: Props) {
  const project = useFetchProject(projectid);

  return (
    <div class={"container-lg " + style.main}>
      {project.isLoading || project.error || !project.data ? (
        `View project: ${projectid}`
      ) : (
        <>
          <ProjectCard project={project.data} />
          <div class={style.action}>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}
