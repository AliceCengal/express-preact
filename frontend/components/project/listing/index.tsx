import { h } from "preact";
import { ProjectWithOwner, useFetchAllProjects } from "controllers/project";

import style from "./style.css";

export function ProjectListing() {
  const allProjects = useFetchAllProjects();

  return (
    <table class={style.projects + " card-1"}>
      <ProjectTableHeader />
      {allProjects.data
        ? allProjects.data.map((p: ProjectWithOwner, ix: number) => (
            <ProjectTableRow project={p} ix={ix + 1} />
          ))
        : null}
    </table>
  );
}

export function ProjectTableHeader() {
  return (
    <tr>
      <th>#</th>
      <th>Project title</th>
      <th>Owner</th>
      <th>Date created</th>
      <th>Date updated</th>
    </tr>
  );
}

export function ProjectTableRow({
  project,
  ix,
}: {
  project: ProjectWithOwner;
  ix: number;
}) {
  return (
    <tr>
      <td>{ix}</td>
      <td>
        <a href={"/project/" + project.id}>{project.title}</a>
      </td>
      <td>
        <a href={"/profile/" + project.ownerid}>{project.owner?.name}</a>
      </td>
      <td>{new Date(project.cts).toDateString()}</td>
      <td>{new Date(project.uts).toDateString()}</td>
    </tr>
  );
}
