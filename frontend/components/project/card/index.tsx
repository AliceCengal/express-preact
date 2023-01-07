import { h } from "preact";
import { ProjectWithOwner } from "controllers/project";

import style from "./style.css";

export type Props = {
  project: ProjectWithOwner;
};

export function ProjectCard({ project }: Props) {
  return (
    <div class={style.profile_card + " card-1"}>
      <label>Title</label>
      <span>{project.title}</span>
      <label>Description</label>
      <span>{project.description}</span>
      <label>Owner</label>
      <a href={"/profile/" + project.ownerid}>
        <span>{project.owner?.name || "N/A"}</span>
      </a>
    </div>
  );
}
